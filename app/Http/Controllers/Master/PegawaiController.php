<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Pegawai\StorePegawai;
use App\Http\Requests\Master\Pegawai\UpdatePegawai;
use App\Models\User;
use App\Repositories\Master\PegawaiRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class PegawaiController extends Controller implements HasMiddleware
{
    protected PegawaiRepository $repository;

    public function __construct(PegawaiRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:pegawai-index', only: ['index', 'data']),
            new Middleware('can:pegawai-create', only: ['store']),
            new Middleware('can:pegawai-update', only: ['update']),
            new Middleware('can:pegawai-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . '\\' . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('pegawai-create'),
                'update' => $user->can('pegawai-update'),
                'delete' => $user->can('pegawai-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/Pegawai/Index', compact("gate"));
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
    public function store(StorePegawai $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $Pegawai)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PegawaiRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawai $request, User $pegawai)
    {
        $this->repository->update($pegawai->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $pegawai)
    {
        $this->repository->delete($pegawai->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(Request $request)
    {
        return response()->json($this->repository->data($request), 200);
    }
}
