<?php

namespace App\Repositories\Transaksi;

use App\Http\Resources\Pembayaran\PembayaranResource;
use App\Models\Pembayaran;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PembayaranRepository
{
    public function __construct(protected Pembayaran $model) {}

    private function applySearchFilter($request)
    {
        return fn($q) => $q->where(function ($query) use ($request) {
            $query->where('total', 'like', "%{$request->search}%")
            ->orWhereHas('user', fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orWhereHas('pelanggan', fn($q) => $q->where('nama', 'like', "%{$request->search}%"))
            ->orWhereHas('paketInternet', fn($q) => $q->where('nama', 'like', "%{$request->search}%"));
        });
    }
    public function data($request)
    {
        $tanggal = $request->tanggal ?? now()->format('Y-m');
        $start = Carbon::parse($tanggal)->startOfMonth()->timestamp;
        $end = Carbon::parse($tanggal)->endOfMonth()->timestamp;
        $transaksi = $this->model::select('id', 'user_id', 'perusahaan_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status')
        ->where('perusahaan_id', $request->perusahaan)
            ->whereBetween('tanggal_pembayaran', [$start, $end])
            ->when($request->search, $this->applySearchFilter($request))
            ->latest()
            ->paginate($request->perPage ?? 25);
        $result = PembayaranResource::collection($transaksi)->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }

    public function store()
    {
        return $this->model::select('uuid', 'name')->get();
    }
}
