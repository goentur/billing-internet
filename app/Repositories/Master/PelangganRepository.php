<?php

namespace App\Repositories\Master;

use App\Models\Pelanggan;

class PelangganRepository
{
    public function __construct(protected Pelanggan $model) {}

    public function allData($perusahaan)
    {
        return $this->model::with('paketInternet')->select('id', 'nama', 'paket_internet_id')->where('perusahaan_id', $perusahaan)->get();
    }

    public function data($request)
    {
        $query = $this->model::with('paketInternet', 'odp')->select('id', 'paket_internet_id', 'odp_id', 'nama', 'tanggal_bayar', 'telp', 'alamat');
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('tanggal_bayar', 'like', '%' . $request->search . '%')
                ->orWhere('telp', 'like', '%' . $request->search . '%')
                ->orWhere('alamat', 'like', '%' . $request->search . '%')
                ->orWhereHas('paketInternet', fn($q) => $q->where('nama', 'like', "%{$request->search}%"));
        }
        if ($request->odp) {
            $query->where('odp_id', $request->odp);
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
