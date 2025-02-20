<?php

namespace App\Repositories\Master;

use App\Http\Resources\LabelValueResource;
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
        return LabelValueResource::collection($this->model::select('id', 'nama')->get());
    }
    public function data($request)
    {
        $query = $this->model::select('*');
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('singkatan', 'like', '%' . $request->search . '%');
        }
        return $query->latest()->paginate($request->perPage ?? 25);
    }
}
