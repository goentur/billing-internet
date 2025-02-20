<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataPerusahaanRequest;
use App\Http\Requests\Common\PerusahaanRequest;
use App\Http\Requests\Master\PaketInternet\StorePaketInternet;
use App\Http\Requests\Master\PaketInternet\UpdatePaketInternet;
use App\Models\PaketInternet;
use App\Repositories\Master\PaketInternetRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PaketInternetController extends Controller implements HasMiddleware
{
    protected PaketInternetRepository $repository;

    public function __construct(PaketInternetRepository $repository)
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
        return Memo::forHour('paket-internet-gate-' . $user->getKey(), function () use ($user) {
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
        $gate = $this->gate();
        return inertia('Master/PaketInternet/Index', compact("gate"));
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
    public function store(StorePaketInternet $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(PaketInternet $paketInternet)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaketInternetRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaketInternet $request, PaketInternet $paketInternet)
    {
        $this->repository->update($paketInternet->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaketInternet $paketInternet)
    {
        $this->repository->delete($paketInternet->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(DataPerusahaanRequest $request)
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
