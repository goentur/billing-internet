<?php

namespace App\Exports\Transaksi;

use App\Http\Resources\Laporan\LaporanPembayaranResource;
use App\Repositories\Transaksi\PembayaranRepository;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class PembayaranExportExcel implements FromView, ShouldAutoSize
{
    use Exportable;
    protected PembayaranRepository $repository;
    protected $request;

    public function __construct(PembayaranRepository $repository, $request)
    {
        $this->repository = $repository;
        $this->request = $request;
    }

    public function view(): View
    {
        return view('laporan.pembayaran.pembayaran', [
            'datas' => LaporanPembayaranResource::collection($this->repository->queryPembayaran($this->request)->get())->toArray(request()),
            'periode' => Carbon::parse($this->request->tanggal)->format('M Y'),
        ]);
    }
}
