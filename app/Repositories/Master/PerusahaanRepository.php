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
                'alamat' => $request->alamat,
                'koordinat' => $request->koordinat,
                'logo' => $path,
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

            // Ambil data lama berdasarkan ID
            $item = $this->model->findOrFail($id);

            // Cek apakah ada file logo yang baru diunggah
            if ($request->hasFile('logo')) {
                // Jika ada logo lama, hapus dulu
                if ($item->logo) {
                    Storage::disk('public')->delete($item->logo);
                }

                // Simpan logo baru dengan nama yang dihasilkan oleh Helpers::filename()
                $fileName = Helpers::filename() . '.' . $request->file('logo')->getClientOriginalExtension();
                $path = $request->file('logo')->storeAs('logo', $fileName, 'public');
            } else {
                // Jika tidak ada logo baru, tetap gunakan logo lama
                $path = $item->logo;
            }

            // Update data
            $item->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'koordinat' => $request->koordinat,
                'logo' => $path,
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
