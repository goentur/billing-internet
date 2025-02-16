<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Repositories\Master\PelangganRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class PelangganController extends Controller implements HasMiddleware
{
    protected PelangganRepository $repository;

    public function __construct(PelangganRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:paket-internet-index', only: ['index', 'data']),
            new Middleware('can:paket-internet-create', only: ['store']),
            new Middleware('can:paket-internet-update', only: ['update']),
            new Middleware('can:paket-internet-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . '\\' . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('paket-internet-create'),
                'update' => $user->can('paket-internet-update'),
                'delete' => $user->can('paket-internet-delete'),
            ];
        });
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelanggan $pelanggan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pelanggan $pelanggan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pelanggan $pelanggan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelanggan $pelanggan)
    {
        //
    }

    /**
     * Resource from storage.
     */
    public function data(Request $request)
    {
        return response()->json($this->repository->data($request), 200);
    }
}
