<?php

namespace App\Http\Resources\Laporan;

use App\Support\Facades\Memo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class LaporanPembayaranResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $timezone = Memo::forDay('user-timezone-' . Auth::id(), fn() => Auth::user()?->zonaWaktu->nama ?? 'UTC');
        return [
            'user' => $this->when(!blank($this->user), $this->user->name),
            'pelanggan' => $this->when(!blank($this->pelanggan), function () {
                return Memo::for10min('pelanggan-' . $this->pelanggan_id, function () {
                    return [
                        'nama' => $this->pelanggan->nama,
                        'alamat' => $this->pelanggan->alamat,
                    ];
                });
            }),
            'paket_internet' => $this->when(!blank($this->paketInternet), Memo::for10min('pembayaran-paket-internet-' . $this->paket_internet_id, fn() => $this->paketInternet->nama)),
            'tanggal_pembayaran' => $this->convertToTimezone($this->tanggal_pembayaran, $timezone),
            'tanggal_transaksi' => $this->convertToTimezone($this->tanggal_transaksi, $timezone),
            'total' => $this->total,
        ];
    }

    /**
     * Fungsi helper untuk konversi epoch time ke zona waktu tertentu
     */
    private function convertToTimezone($timestamp, $timezone)
    {
        $date = Carbon::createFromTimestamp($timestamp, 'UTC')->setTimezone($timezone);
        return [
            'tanggal' => $date->format('Y-m-d'),
            'jam' => $date->format('H:i:s'),
        ];
    }
}
