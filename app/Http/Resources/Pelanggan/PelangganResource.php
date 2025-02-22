<?php

namespace App\Http\Resources\Pelanggan;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PelangganResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'odp' => $this->when(!blank($this->odp), Memo::for10min('odp-' . $this->odp_id, fn() => $this->odp->nama)),
            'nama' => $this->nama,
            'tanggal_bayar' => $this->tanggal_bayar,
            'telp' => $this->telp,
            'alamat' => $this->alamat,
            'paket_internet' => $this->when(!blank($this->paketInternet), Memo::for10min('paket-internet-' . $this->paket_internet_id, fn() => $this->paketInternet->nama)),
        ];
    }
}
