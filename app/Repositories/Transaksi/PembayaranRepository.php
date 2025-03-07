<?php

namespace App\Repositories\Transaksi;

use App\Enums\PembayaranStatus;
use App\Http\Resources\Laporan\PembayaranResource as LaporanPembayaranResource;
use App\Http\Resources\Laporan\PiutangResource;
use App\Http\Resources\Pembayaran\CetakPembayaranResource;
use App\Http\Resources\Pembayaran\PembayaranResource;
use App\Jobs\SendNotificationWhatsApp;
use App\Models\Pelanggan;
use App\Models\Pembayaran;
use App\Support\Facades\Helpers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PembayaranRepository
{
    public function __construct(protected Pembayaran $model) {}

    private function applySearchFilter($request)
    {
        return fn($q) => $q->where(function ($query) use ($request) {
            $query->where('total', 'like', "%{$request->search}%")
            ->orWhereHas('user', fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orWhereHas('pelanggan', fn($q) => $q->where('nama', 'like', "%{$request->search}%"))
            ->orWhereHas('paketInternet', fn($q) => $q->where('nama', 'like', "%{$request->search}%"));
        });
    }
    public function data($request)
    {
        $tanggal = $request->tanggal ?? now()->format('Y-m');
        $start = Carbon::parse($tanggal)->startOfMonth()->timestamp;
        $end = Carbon::parse($tanggal)->endOfMonth()->timestamp;
        $transaksi = $this->model::with('user', 'perusahaan', 'pelanggan', 'paketInternet')->select('id', 'user_id', 'perusahaan_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status')
        ->where('perusahaan_id', $request->perusahaan)
            ->whereBetween('tanggal_pembayaran', [$start, $end])
            ->when($request->search, $this->applySearchFilter($request))
            ->latest()
            ->paginate($request->perPage ?? 25);
        $result = PembayaranResource::collection($transaksi)->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();

            // Ambil data pelanggan dengan relasi
            $pelanggan = Pelanggan::with('perusahaan', 'paketInternet')
                ->select('id', 'perusahaan_id', 'paket_internet_id', 'nama', 'telp', 'tanggal_bayar', 'alamat')
                ->findOrFail($request->pelanggan);

            // Konversi bulan_pembayaran ke timestamp awal dan akhir bulan
            $periode = Carbon::createFromFormat('Y-m', $request->bulan_pembayaran);
            $startOfMonth = $periode->startOfMonth()->timestamp;
            $endOfMonth = $periode->endOfMonth()->timestamp;

            // Cek apakah pembayaran sudah ada
            if ($this->model->where('pelanggan_id', $pelanggan->id)
                ->whereBetween('tanggal_pembayaran', [$startOfMonth, $endOfMonth])
                ->exists()
            ) {
                throw ValidationException::withMessages([
                    'pelanggan' => 'Pelanggan sudah membayar pada bulan yang dipilih.',
                ]);
            }

            // Set tanggal pembayaran dalam UTC
            $tanggalPembayaran = Carbon::createFromFormat(
                'Y-m-d H:i:s',
                "{$request->bulan_pembayaran}-{$pelanggan->tanggal_bayar} " . now()->format('H:i:s')
            )->timestamp;

            // Simpan data pembayaran
            $this->model->create([
                'user_id' => Auth::id(),
                'perusahaan_id' => $request->perusahaan,
                'pelanggan_id' => $request->pelanggan,
                'paket_internet_id' => $pelanggan->paket_internet_id,
                'tanggal_pembayaran' => $tanggalPembayaran,
                'tanggal_transaksi' => now()->timestamp,
                'total' => optional($pelanggan->paketInternet)->harga ?? 0,
                'status' => PembayaranStatus::SELESAI,
            ]);

            DB::commit();
            $this->notifikasi($pelanggan, $request->bulan_pembayaran);
        } catch (ValidationException $e) {
            DB::rollBack();
            throw $e; // Lempar kembali error validasi
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'pelanggan' => 'Terjadi kesalahan saat penyimpanan data, silakan ulangi lagi.',
            ]);
        }
    }
    public function cetakData($request)
    {
        return new CetakPembayaranResource($this->model::with('user', 'pelanggan', 'paketInternet')->select('id', 'user_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total')
        ->findOrFail($request->id));
    }
    public function notifikasi($pelanggan, $bulanPembayaran)
    {
        $message = "
📢 *Konfirmasi Pembayaran Internet Berhasil*

Halo *{$pelanggan->nama}* 👋,

Terima kasih! Kami telah menerima pembayaran internet Anda dengan rincian sebagai berikut:

```
Nama        : " . $pelanggan->nama . "
Alamat      : " . $pelanggan->alamat . "
Paket       : " . optional($pelanggan->paketInternet)->nama . "
Nominal     : " . Helpers::ribuan(optional($pelanggan->paketInternet)->harga) . "
Keterangan  : Bayar internet untuk bulan " . Carbon::createFromFormat('Y-m', $bulanPembayaran)->translatedFormat('M Y') . "
```

Terima kasih telah menggunakan layanan kami! 😊  
Salam,  
*{$pelanggan->perusahaan->nama}*

_pembayaran sudah termasuk PPN 11%_
_untuk pengaduan, silahkan hubungi " . $pelanggan->perusahaan->telp . ". Terima kasih._
";
        SendNotificationWhatsApp::dispatch($pelanggan->perusahaan->token_wa, $pelanggan->telp, $message)->delay(now()->addSeconds(10));
    }

    public function pembayaran($request)
    {
        $tanggal = $request->tanggal ?? now()->format('Y-m');
        $start = Carbon::parse($tanggal)->startOfMonth()->timestamp;
        $end = Carbon::parse($tanggal)->endOfMonth()->timestamp;
        $transaksi = $this->model::with('user', 'perusahaan', 'pelanggan', 'paketInternet')->select('id', 'user_id', 'perusahaan_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status')
            ->where('perusahaan_id', $request->perusahaan)
            ->whereBetween('tanggal_pembayaran', [$start, $end])
            ->latest()
            ->paginate($request->perPage ?? 25);
        $result = LaporanPembayaranResource::collection($transaksi)->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
    public function piutang($request)
    {
        $pembayaran = Pelanggan::with('paketInternet')->where('perusahaan_id', $request->perusahaan)->whereDoesntHave('pembayaran', function ($query) use ($request) {
            $tanggal = $request->tanggal ?? now()->format('Y-m');
            $start = Carbon::parse($tanggal)->startOfMonth()->timestamp;
            $end = Carbon::parse($tanggal)->endOfMonth()->timestamp;
            $query
                ->whereBetween('tanggal_pembayaran', [$start, $end]);
        })
            ->latest()
            ->paginate($request->perPage ?? 25);
        $result = PiutangResource::collection($pembayaran)->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
}
