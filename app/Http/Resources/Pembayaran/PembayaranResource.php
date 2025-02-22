<?php

namespace App\Http\Resources\Pembayaran;

use App\Support\Facades\Helpers;
use App\Support\Facades\Memo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class PembayaranResource extends JsonResource
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
            'id' => $this->id,
            'user' => $this->when(!blank($this->user), Memo::for10min('user-' . $this->user_id, fn() => $this->user->name)),
            'pelanggan' => $this->when(!blank($this->pelanggan), Memo::for10min('pelanggan-' . $this->pelanggan_id, fn() => $this->pelanggan->nama)),
            'paket_internet' => $this->when(!blank($this->paketInternet), Memo::for10min('paket-internet-' . $this->paketInternet_id, fn() => $this->paketInternet->nama)),
            'tanggal_pembayaran' => $this->convertToTimezone($this->tanggal_pembayaran, $timezone),
            'tanggal_transaksi' => $this->convertToTimezone($this->tanggal_transaksi, $timezone),
            'total' => Helpers::ribuan($this->total),
            'status' => $this->status->value,
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
