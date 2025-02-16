<?php

namespace App\Http\Requests\Pengaturan\Role;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRole extends FormRequest
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
            'nama' => 'required|string|max:255|unique:' . Role::class . ',name',
            'permissions' => 'required|array',
            'permissions.*' => Rule::exists(Permission::class, 'uuid'),
        ];
    }
}
