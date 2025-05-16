<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Pelanggan\DataRequest;
use App\Http\Requests\Transaksi\Pembayaran\StorePembayaran;
use App\Repositories\Master\PelangganRepository;
use App\Repositories\Transaksi\PembayaranRepository;

class FullApiController extends Controller
{
    public function __construct(
        protected PelangganRepository $pelanggan,
        protected PembayaranRepository $pembayaran
    ) {}

    public function dataPelanggan(DataRequest $request)
    {
        return response()->json($this->pelanggan->dataApi($request), 200);
    }

    public function bayar(StorePembayaran $request)
    {
        $this->pembayaran->store($request);
        return response()->json([
            'status' => 'success',
            'message' => 'Pembayaran berhasil disimpan.'
        ], 201);
    }
}
