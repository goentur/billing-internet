<?php

namespace App\Http\Requests\Transaksi\Pembayaran;

use App\Models\Pelanggan;
use App\Models\Perusahaan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePembayaran extends FormRequest
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
            'perusahaan' => 'required|string|uuid|' . Rule::exists(Perusahaan::class, 'id'),
            'pelanggan' => 'required|string|uuid|' . Rule::exists(Pelanggan::class, 'id'),
            'bulan_pembayaran' => 'required|string|max:255',
        ];
    }
}
