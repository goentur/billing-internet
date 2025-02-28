<?php

namespace App\Repositories\Transaksi;

use App\Enums\PembayaranStatus;
use App\Http\Resources\Pembayaran\CetakPembayaranResource;
use App\Http\Resources\Pembayaran\PembayaranResource;
use App\Jobs\SendNotificationWhatsApp;
use App\Models\Pelanggan;
use App\Models\Pembayaran;
use App\Models\Perusahaan;
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
        $transaksi = $this->model::select('id', 'user_id', 'perusahaan_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status')
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

            // Ambil data pelanggan
            $pelanggan = Pelanggan::with('perusahaan', 'paketInternet')
            ->select('id', 'perusahaan_id', 'paket_internet_id', 'nama', 'telp', 'tanggal_bayar', 'alamat')
            ->findOrFail($request->pelanggan);

            // Konversi bulan_pembayaran ke timestamp awal dan akhir bulan
            $startOfMonth = Carbon::parse($request->bulan_pembayaran)->startOfMonth()->timestamp;
            $endOfMonth = Carbon::parse($request->bulan_pembayaran)->endOfMonth()->timestamp;

            // Cek apakah pembayaran sudah ada untuk pelanggan ini di bulan tersebut
            $existingPayment = $this->model
                ->where('pelanggan_id', $pelanggan->id)
                ->whereBetween('tanggal_pembayaran', [$startOfMonth, $endOfMonth])
                ->exists();

            if ($existingPayment) {
                throw ValidationException::withMessages([
                    'pelanggan' => 'Pelanggan sudah membayar pada bulan yang dipilih.',
                ]);
            }
            // Set tanggal pembayaran dalam UTC
            $tanggalPembayaran = Carbon::parse($request->bulan_pembayaran . '-' . $pelanggan->tanggal_bayar . ' ' . date('H:i:s'))->timestamp;
            // Buat data pembayaran baru
            $this->model->create([
                'user_id' => Auth::id(),
                'perusahaan_id' => $request->perusahaan,
                'pelanggan_id' => $request->pelanggan,
                'paket_internet_id' => $pelanggan->paket_internet_id,
                'tanggal_pembayaran' => $tanggalPembayaran,
                'tanggal_transaksi' => time(),
                'total' => $pelanggan->paketInternet->harga,
                'status' => PembayaranStatus::SELESAI,
            ]);

            DB::commit();
            SendNotificationWhatsApp::dispatch($pelanggan->telp, '
📢 Konfirmasi Pembayaran Internet Berhasil

Halo ' . $pelanggan->nama . ' 👋,

Terima kasih! Kami telah menerima pembayaran internet Anda dengan rincian sebagai berikut:

Nama        : ' . $pelanggan->nama . '
Alamat      : ' . $pelanggan->alamat . '
Periode     : ' . $request->bulan_pembayaran . '
Nominal     : ' . Helpers::ribuan($pelanggan->paketInternet->harga) . '

Terima kasih telah menggunakan layanan kami! 😊
Terima kasih sudah mempercayakan layanan internet Anda kepada kami. Selamat menikmati koneksi yang cepat dan stabil! 😊

Salam,
' . $pelanggan->perusahaan->nama . '
')->delay(now()->addSeconds(10));

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
        return new CetakPembayaranResource($this->model::select('id', 'user_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total')
        ->findOrFail($request->id));
    }
}
