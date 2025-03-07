<?php

namespace App\Http\Requests\Laporan;

use App\Models\Perusahaan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataPiutang extends FormRequest
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
            'page' => 'required|numeric',
            'perPage' => 'required|numeric|max:100|min:25',
            'perusahaan' => 'required|string|uuid|' . Rule::exists(Perusahaan::class, 'id'),
            'search' => 'nullable|string|max:255',
            'tanggal' => 'nullable|string|max:255',
        ];
    }
}
