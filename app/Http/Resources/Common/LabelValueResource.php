<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LabelValueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'value' => $this->uuid ?? $this->id,
            'label' => blank($this->nama) ? $this->name : $this->nama . (blank($this->alamat) ? '' : ' - ' . $this->alamat),
        ];
    }
}
