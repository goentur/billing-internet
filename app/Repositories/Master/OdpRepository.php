<?php

namespace App\Repositories\Master;

use App\Models\Odp;
use Illuminate\Validation\ValidationException;

class OdpRepository
{
    public function __construct(protected Odp $model) {}

    public function allData($perusahaan)
    {
        return $this->model::select('id', 'nama', 'alamat')->where('perusahaan_id', $perusahaan)->get();
    }

    public function data($request)
    {
        $query = $this->model::select('id', 'nama', 'alamat', 'koordinat');
        return $query->where('perusahaan_id', $request->perusahaan)->latest()->get();
    }

    public function store($request)
    {
        $ada = $this->model->select('id')->where(['nama' => $request->nama, 'perusahaan_id' => $request->perusahaan])->first();
        if (!$ada) {
            return $this->model->create([
                'perusahaan_id' => $request->perusahaan,
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'koordinat' => json_encode($request->koordinat),
            ]);
        } else {
            throw ValidationException::withMessages([
                'nama' => 'The name is already taken, please choose another one.',
            ]);
        }
    }

    public function update($id, $request)
    {
        $ada = $this->model->select('id')->where(['nama' => $request->nama, 'perusahaan_id' => $request->perusahaan])->first();
        if (!$ada) {
            return $this->model->findOrFail($id)?->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
            ]);
        } else {
            throw ValidationException::withMessages([
                'nama' => 'The name is already taken, please choose another one.',
            ]);
        }
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)?->delete();
    }
}
