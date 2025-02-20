<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Master\Perusahaan\StorePerusahaan;
use App\Http\Requests\Master\Perusahaan\UpdatePerusahaan;
use App\Models\Perusahaan;
use App\Repositories\Master\PerusahaanRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\Middleware;

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
            new Middleware('can:perusahaan-index', only: ['index', 'data']),
            new Middleware('can:perusahaan-create', only: ['store']),
            new Middleware('can:perusahaan-update', only: ['update']),
            new Middleware('can:perusahaan-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('perusahaan-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('perusahaan-create'),
                'update' => $user->can('perusahaan-update'),
                'delete' => $user->can('perusahaan-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/Perusahaan/Index', compact("gate"));
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
    public function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    /**
     * All resource from storage.
     */
    public function allData()
    {
        return response()->json($this->repository->allData(), 200);
    }
}
