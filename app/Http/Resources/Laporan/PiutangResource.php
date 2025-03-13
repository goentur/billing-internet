<?php

namespace App\Http\Resources\Laporan;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PiutangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama' => $this->nama,
            'alamat' => $this->alamat,
            'paket' => $this->paketInternet?->nama,
            'tgl' => $this->tanggal_bayar,
        ];
    }
}
