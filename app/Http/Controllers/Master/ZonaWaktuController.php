<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Master\ZonaWaktu\StoreZonaWaktu;
use App\Http\Requests\Master\ZonaWaktu\UpdateZonaWaktu;
use App\Models\ZonaWaktu;
use App\Repositories\Master\ZonaWaktuRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ZonaWaktuController extends Controller implements HasMiddleware
{
    protected ZonaWaktuRepository $repository;

    public function __construct(ZonaWaktuRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:zona-waktu-index', only: ['index', 'data']),
            new Middleware('can:zona-waktu-create', only: ['store']),
            new Middleware('can:zona-waktu-update', only: ['update']),
            new Middleware('can:zona-waktu-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('zona-waktu-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('zona-waktu-create'),
                'update' => $user->can('zona-waktu-update'),
                'delete' => $user->can('zona-waktu-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/ZonaWaktu/Index', compact("gate"));
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
    public function store(StoreZonaWaktu $request)
    {
        $this->repository->store($request->all());
        back()->with('success', 'Data berhasil ditambahkan');
    }
    
    /**
     * Display the specified resource.
     */
    public function show(ZonaWaktu $zonaWaktu)
    {
        abort(404);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ZonaWaktuRepository $repository)
    {
        abort(404);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateZonaWaktu $request, ZonaWaktu $zonaWaktu)
    {
        $this->repository->update($zonaWaktu->id, $request->all());
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ZonaWaktu $zonaWaktu)
    {
        $this->repository->delete($zonaWaktu->id);
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
