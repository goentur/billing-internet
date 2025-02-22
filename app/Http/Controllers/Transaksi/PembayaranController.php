<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\Pembayaran\DataPembayaran;
use App\Http\Requests\Transaksi\Pembayaran\StorePembayaran;
use App\Repositories\Transaksi\PembayaranRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

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
            new Middleware('can:pembayaran-index', only: ['index', 'data']),
            new Middleware('can:pembayaran-create', only: ['store'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('pembayaran-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('pembayaran-create'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Transaksi/Pembayaran/Index', compact("gate"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePembayaran $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Resource from storage.
     */
    public function data(DataPembayaran $request)
    {
        return response()->json($this->repository->data($request), 200);
    }
}
