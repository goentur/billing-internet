<?php

namespace App\Http\Controllers\Laporan;

use App\Exports\Transaksi\PembayaranExportExcel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Laporan\DataPembayaran;
use App\Http\Requests\Laporan\ExportRequest;
use App\Repositories\Transaksi\PembayaranRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Maatwebsite\Excel\Facades\Excel;

class PembayaranController extends Controller implements HasMiddleware
{
    protected PembayaranRepository $repository;

    public function __construct(PembayaranRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:laporan-pembayaran-index', only: ['index']),
            new Middleware('can:laporan-pembayaran-print', only: ['print'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('laporan-pembayaran-' . $user->getKey(), function () use ($user) {
            return [
                'print' => $user->can('laporan-pembayaran-print'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Laporan/Pembayaran/Index', compact("gate"));
    }

    /**
     * Resource from storage.
     */
    public function data(DataPembayaran $request)
    {
        return response()->json($this->repository->pembayaran($request));
    }

    public function exportExcel(ExportRequest $request)
    {
        return (new PembayaranExportExcel($this->repository, $request))->download('laporan-pembayaran.xlsx');
    }
}
