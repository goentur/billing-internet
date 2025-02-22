<?php

namespace App\Http\Resources\Pemilik;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemilikResource extends JsonResource
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
            'email' => $this->email,
            'name' => $this->name,
            'zona_waktu' => $this->when(!blank($this->zonaWaktu), Memo::for10min('zona-waktu-' . $this->zona_waktu_id, fn() => $this->zonaWaktu->nama)),
            'perusahaan' => $this->when(!blank($this->perusahaan), Memo::for10min('perusahaan-' . $this->perusahaan_id, fn() => $this->perusahaan->pluck('nama')->implode(', '))),
        ];
    }
}
