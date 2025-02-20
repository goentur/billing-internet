<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Pengaturan\Pengguna\StorePengguna;
use App\Http\Requests\Pengaturan\Pengguna\UpdatePengguna;
use App\Models\User;
use App\Repositories\Pengaturan\PenggunaRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PenggunaController extends Controller implements HasMiddleware
{
    protected PenggunaRepository $repository;

    public function __construct(PenggunaRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:pengguna-index', only: ['index', 'data']),
            new Middleware('can:pengguna-create', only: ['store']),
            new Middleware('can:pengguna-update', only: ['update']),
            new Middleware('can:pengguna-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('pengguna-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('pengguna-create'),
                'update' => $user->can('pengguna-update'),
                'delete' => $user->can('pengguna-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Pengaturan/Pengguna/Index', compact("gate"));
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
    public function store(StorePengguna $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $pengguna)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PenggunaRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePengguna $request, User $pengguna)
    {
        $this->repository->update($pengguna->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $pengguna)
    {
        $this->repository->delete($pengguna->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }
}
