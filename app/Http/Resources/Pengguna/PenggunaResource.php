<?php

namespace App\Http\Resources\Pengguna;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenggunaResource extends JsonResource
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
        ];
    }
}
