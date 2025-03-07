<?php

namespace App\Repositories\Master;

use App\Http\Resources\Pegawai\PegawaiResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PegawaiRepository
{
    public function __construct(protected User $model) {}
    
    private function applySearchFilter($request)
    {
        return fn($q) => $q->where(function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%")
                ->orWhereHas('zonaWaktu', fn($q) => $q->where('nama', 'like', "%{$request->search}%"));
        });
    }
    public function data($request)
    {
        $data = $this->model::with('zonaWaktu')->select('id', 'zona_waktu_id', 'name', 'email')
            ->when($request->search, $this->applySearchFilter($request))
            ->whereHas('perusahaan', fn($q) => $q->where('id', $request->perusahaan))
            ->whereHas('roles', fn($q) => $q->where('name', 'PEGAWAI'))
            ->latest()
            ->paginate($request->perPage ?? 25);
        $result = PegawaiResource::collection($data)->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();
            $user = $this->model->create([
                'zona_waktu_id' => $request->zona_waktu,
                'email' => $request->email,
                'name' => $request->nama,
                'password' => Hash::make($request->password),
            ]);
            $user->assignRole("PEGAWAI");
            $user->perusahaan()->sync($request->perusahaan);
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
            $user = $this->model->findOrFail($id);
            $user->update([
                'zona_waktu_id' => $request->zona_waktu,
                'email' => $request->email,
                'name' => $request->nama,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function delete($id)
    {
        return $this->model->find($id)?->delete();
    }
}
