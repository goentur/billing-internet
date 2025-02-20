<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\PerusahaanRequest;
use App\Http\Requests\Master\Odp\StoreOdp;
use App\Http\Requests\Master\Odp\UpdateOdp;
use App\Models\Odp;
use App\Repositories\Master\OdpRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OdpController extends Controller implements HasMiddleware
{
    protected OdpRepository $repository;

    public function __construct(OdpRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:odp-index', only: ['index', 'data']),
            new Middleware('can:odp-create', only: ['store']),
            new Middleware('can:odp-update', only: ['update']),
            new Middleware('can:odp-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('odp-gate-' . $user->getKey(), function () use ($user) {
            return [
                'pelanggan' => $user->can('pelanggan-create'),
                'create' => $user->can('odp-create'),
                'update' => $user->can('odp-update'),
                'delete' => $user->can('odp-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/Odp/Index', compact("gate"));
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
    public function store(StoreOdp $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Odp $odp)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Odp $odp)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOdp $request, Odp $odp)
    {
        $this->repository->update($odp->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Odp $odp)
    {
        $this->repository->delete($odp->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(PerusahaanRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    /**
     * All resource from storage.
     */
    public function allData(PerusahaanRequest $request)
    {
        return response()->json($this->repository->allData($request), 200);
    }
}
