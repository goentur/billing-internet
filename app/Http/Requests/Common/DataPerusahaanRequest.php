<?php

namespace App\Http\Requests\Common;

use App\Models\Odp;
use App\Models\Perusahaan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataPerusahaanRequest extends FormRequest
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
            'search' => 'nullable|string|max:255',
            'perPage' => 'required|numeric|max:100|min:25',
            'perusahaan' => 'required|string|uuid|' . Rule::exists(Perusahaan::class, 'id'),
            'odp' => 'nullable|string|uuid|' . Rule::exists(Odp::class, 'id'),
        ];
    }
}
