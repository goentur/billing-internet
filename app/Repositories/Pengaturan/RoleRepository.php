<?php

namespace App\Repositories\Pengaturan;

use App\Http\Resources\Common\LabelValueResource;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleRepository
{
    public function __construct(protected Role $model) {}
    public function allData()
    {
        return LabelValueResource::collection($this->model::select('uuid', 'name')->get());
    }
    public function data($request)
    {
        $query = $this->model::select('uuid', 'name')->with('permissions');
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhereHas('permissions', fn($q) => $q->where('name', 'like', "%{$request->search}%"));
        }
        return $query->latest()->paginate($request->perPage ?? 25);
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();
            $role = $this->model->create([
                'name' => $request->nama,
            ]);
            $role->givePermissionTo($request->permissions);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function update($id, $request)
    {
        try {
            DB::beginTransaction();
            $role = $this->model->findOrFail($id);
            $role->update([
                'name' => $request->nama,
            ]);
            $role->syncPermissions($request->permissions);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $role = $this->model->findOrFail($id);
            $role->revokePermissionTo($role->permissions);
            $role->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
