<?php

namespace App\Exports\Transaksi;

use App\Http\Resources\Laporan\PiutangResource;
use App\Repositories\Transaksi\PembayaranRepository;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class PiutangExportExcel implements FromView, ShouldAutoSize
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
        return view('laporan.piutang.piutang', [
            'datas' => PiutangResource::collection($this->repository->queryPiutang($this->request)->get())->toArray(request()),
            'periode' => Carbon::parse($this->request->tanggal)->format('M Y'),
        ]);
    }
}
