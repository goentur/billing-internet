<?php

namespace App\Repositories\Pengaturan;

use App\Http\Resources\Common\LabelValueResource;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionRepository
{
    public function __construct(protected Permission $model) {}
    public function allData()
    {
        return LabelValueResource::collection($this->model::select('uuid', 'name')->get());
    }
    public function data($request)
    {
        $query = $this->model::select('uuid', 'name', 'guard_name')->with('roles');
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhereHas('roles', fn($q) => $q->where('name', 'like', "%{$request->search}%"));
        }
        return $query->latest()->paginate($request->perPage ?? 25);
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();
            $permission = $this->model->create([
                'name' => $request->nama,
                'guard_name' => $request->guard_name,
            ]);
            $permission->syncRoles($request->roles);
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
            $permission = $this->model->findOrFail($id);
            $permission->update([
                'name' => $request->nama,
                'guard_name' => $request->guard_name,
            ]);
            $permission->syncRoles($request->roles);
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
            $permission = $this->model->findOrFail($id);
            $permission->syncRoles([]);
            $permission->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
