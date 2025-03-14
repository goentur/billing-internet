<?php

namespace App\Http\Controllers\Laporan;

use App\Exports\Transaksi\PiutangExportExcel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Laporan\DataPiutang;
use App\Http\Requests\Laporan\ExportRequest;
use App\Repositories\Transaksi\PembayaranRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PiutangController extends Controller implements HasMiddleware
{
    protected PembayaranRepository $repository;

    public function __construct(PembayaranRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:laporan-piutang-index', only: ['index']),
            new Middleware('can:laporan-piutang-print', only: ['print'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('laporan-piutang-' . $user->getKey(), function () use ($user) {
            return [
                'print' => $user->can('laporan-piutang-print'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Laporan/Piutang/Index', compact("gate"));
    }

    /**
     * Resource from storage.
     */
    public function data(DataPiutang $request)
    {
        return response()->json($this->repository->piutang($request));
    }

    public function exportExcel(ExportRequest $request)
    {
        return (new PiutangExportExcel($this->repository, $request))->download('laporan-piutang.xlsx');
    }
}
