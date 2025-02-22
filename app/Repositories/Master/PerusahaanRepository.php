<?php

namespace App\Repositories\Master;

use App\Http\Resources\Common\LabelValueResource;
use App\Http\Resources\Perusahaan\PerusahaanResource;
use App\Models\Perusahaan;
use App\Repositories\BaseRepository;

class PerusahaanRepository extends BaseRepository
{
    public function __construct(Perusahaan $model)
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
                ->orWhere('alamat', 'like', '%' . $request->search . '%');
        }
        $result = PerusahaanResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
}
