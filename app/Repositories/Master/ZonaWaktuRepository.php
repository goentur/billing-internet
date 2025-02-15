<?php

namespace App\Repositories\Master;

use App\Models\ZonaWaktu;
use App\Repositories\BaseRepository;

class ZonaWaktuRepository extends BaseRepository
{
    public function __construct(ZonaWaktu $model)
    {
        parent::__construct($model);
    }
    public function allData()
    {
        return $this->model::select('id', 'nama', 'singkatan')->get();
    }
    public function data($request)
    {
        $query = $this->model::select('*');
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('singkatan', 'like', '%' . $request->search . '%')
                ->orWhere('gmt_offset', 'like', '%' . $request->search . '%');
        }
        return $query->latest()->paginate($request->perPage ?? 25);
    }
}
