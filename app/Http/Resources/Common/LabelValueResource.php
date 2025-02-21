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
            'value' => $this->id ?? $this->uuid, // Sesuaikan dengan kolom ID
            'label' => $this->nama ?? $this->name, // Sesuaikan dengan kolom label
        ];
    }
}
