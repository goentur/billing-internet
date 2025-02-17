<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Pelanggan\StorePelanggan;
use App\Http\Requests\Master\Pelanggan\UpdatePelanggan;
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
            new Middleware('can:pelanggan-index', only: ['index', 'data']),
            new Middleware('can:pelanggan-create', only: ['store']),
            new Middleware('can:pelanggan-update', only: ['update']),
            new Middleware('can:pelanggan-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . '\\' . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('pelanggan-create'),
                'update' => $user->can('pelanggan-update'),
                'delete' => $user->can('pelanggan-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/Pelanggan/Index', compact("gate"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePelanggan $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelanggan $pelanggan)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PelangganRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePelanggan $request, Pelanggan $pelanggan)
    {
        $this->repository->update($pelanggan->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelanggan $pelanggan)
    {
        $this->repository->delete($pelanggan->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(Request $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    /**
     * All resource from storage.
     */
    public function allData()
    {
        return response()->json(
            $this->repository->allData('asdas')->map(function ($item) {
                return [
                    'value' => $item->id, // Sesuaikan dengan kolom yang digunakan sebagai value
                    'label' => $item->nama, // Sesuaikan dengan kolom yang digunakan sebagai label
                ];
            }),
            200
        );
    }
}
