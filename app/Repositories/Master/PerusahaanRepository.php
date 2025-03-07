<?php

namespace App\Repositories\Master;

use App\Http\Resources\Common\LabelValueResource;
use App\Http\Resources\Perusahaan\PerusahaanResource;
use App\Models\Perusahaan;
use App\Support\Facades\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PerusahaanRepository
{
    public function __construct(protected Perusahaan $model) {}
    public function allData()
    {
        return LabelValueResource::collection($this->model::select('id', 'nama')->get());
    }
    public function data($request)
    {
        $query = $this->model::select('*');
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('alamat', 'like', '%' . $request->search . '%');
        }
        $result = PerusahaanResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }

    public function store($request)
    {
        try {
            DB::beginTransaction();
            $fileName = Helpers::filename() . '.' . $request->file('logo')->getClientOriginalExtension();
            $path = $request->file('logo')->storeAs('logo', $fileName, 'public');
            $this->model->create([
                'nama' => $request->nama,
                'telp' => $request->telp,
                'alamat' => $request->alamat,
                'koordinat' => $request->koordinat,
                'logo' => $path,
                'token_wa' => $request->token_wa,
            ]);
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
            $item = $this->model->findOrFail($id);
            if ($request->hasFile('logo')) {
                if ($item->logo) {
                    Storage::disk('public')->delete($item->logo);
                }
                $fileName = Helpers::filename() . '.' . $request->file('logo')->getClientOriginalExtension();
                $path = $request->file('logo')->storeAs('logo', $fileName, 'public');
            } else {
                $path = $item->logo;
            }
            $item->update([
                'nama' => $request->nama,
                'telp' => $request->telp,
                'alamat' => $request->alamat,
                'koordinat' => $request->koordinat ?? $item->koordinat,
                'logo' => $path,
                'token_wa' => $request->token_wa ?? $item->token_wa,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)?->delete();
    }
}
