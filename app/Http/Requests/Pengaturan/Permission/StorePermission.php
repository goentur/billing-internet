<?php

namespace App\Http\Requests\Pengaturan\Permission;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePermission extends FormRequest
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
            'nama' => 'required|string|max:255|unique:' . Permission::class . ',name',
            'guard_name' => 'required|string|max:255',
            'roles' => 'required|array',
            'roles.*' => Rule::exists(Role::class, 'uuid'),
        ];
    }
}
