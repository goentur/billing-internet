<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Perusahaan\StorePerusahaan;
use App\Http\Requests\Master\Perusahaan\UpdatePerusahaan;
use App\Models\Perusahaan;
use App\Repositories\Master\PerusahaanRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class PerusahaanController extends Controller
{
    protected PerusahaanRepository $repository;

    public function __construct(PerusahaanRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:index-perusahaan', only: ['index', 'data']),
            new Middleware('can:create-perusahaan', only: ['store']),
            new Middleware('can:update-perusahaan', only: ['update']),
            new Middleware('can:delete-perusahaan', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('create-perusahaan'),
                'update' => $user->can('update-perusahaan'),
                'delete' => $user->can('delete-perusahaan'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Master/Perusahaan/Index');
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
    public function store(StorePerusahaan $request)
    {
        $this->repository->store($request->all());
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perusahaan $perusahaan)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perusahaan $perusahaan)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerusahaan $request, Perusahaan $perusahaan)
    {
        $this->repository->update($perusahaan->id, $request->all());
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perusahaan $perusahaan)
    {
        $this->repository->delete($perusahaan->id);
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
            $this->repository->allData()->map(function ($item) {
                return [
                    'value' => $item->id, // Sesuaikan dengan kolom yang digunakan sebagai value
                    'label' => $item->nama, // Sesuaikan dengan kolom yang digunakan sebagai label
                ];
            }),
            200
        );
    }
}
