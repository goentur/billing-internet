<?php

namespace App\Repositories\Master;

use App\Http\Resources\LabelValueResource;
use App\Models\PaketInternet;

class PaketInternetRepository
{
    public function __construct(protected PaketInternet $model) {}

    public function allData($request)
    {
        return LabelValueResource::collection($this->model::select('id', 'nama', 'harga')->where('perusahaan_id', $request->perusahaan)->get());
    }

    public function data($request)
    {
        $query = $this->model::select('id', 'nama', 'harga');
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('harga', 'like', '%' . $request->search . '%');
        }
        return $query->where('perusahaan_id', $request->perusahaan)->latest()->paginate($request->perPage ?? 25);
    }

    public function store($request)
    {
        return $this->model->create([
            'perusahaan_id' => $request->perusahaan,
            'nama' => $request->nama,
            'harga' => $request->harga,
        ]);
    }

    public function update($id, $request)
    {
        return $this->model->findOrFail($id)?->update([
            'nama' => $request->nama,
            'harga' => $request->harga,
        ]);
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)?->delete();
    }
}
