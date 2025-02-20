<?php

namespace App\Repositories\Transaksi;

use App\Http\Resources\PembayaranResource;
use App\Models\Pembayaran;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\DB;

class PembayaranRepository
{
    public function __construct(protected Pembayaran $model) {}

    public function store()
    {
        return $this->model::select('uuid', 'name')->get();
    }
    public function data(string $id): ResourceCollection
    {
        $transaksi = $this->model::select('id', 'user_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status')->where('perusahaan_id', $id)->get();
        return PembayaranResource::collection($transaksi);
    }
}
