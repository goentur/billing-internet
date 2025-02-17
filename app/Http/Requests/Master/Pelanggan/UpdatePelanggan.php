<?php

namespace App\Http\Requests\Master\Pelanggan;

use App\Models\Odp;
use App\Models\PaketInternet;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePelanggan extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'odp' => 'required|string|uuid|' . Rule::exists(Odp::class, 'id'),
            'paket_internet' => 'required|string|uuid|' . Rule::exists(PaketInternet::class, 'id'),
            'nama' => 'required|string|max:255',
            'tanggal_bayar' => 'required|numeric|min:1|max:28',
            'telp' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
        ];
    }
}
