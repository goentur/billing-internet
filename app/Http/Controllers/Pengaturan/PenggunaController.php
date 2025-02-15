<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pengaturan\Pengguna\StorePengguna;
use App\Http\Requests\Pengaturan\Pengguna\UpdatePengguna;
use App\Models\User;
use App\Repositories\Pengaturan\PenggunaRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

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
            new Middleware('can:index-pengguna', only: ['index', 'data']),
            new Middleware('can:create-pengguna', only: ['store']),
            new Middleware('can:update-pengguna', only: ['update']),
            new Middleware('can:delete-pengguna', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('create-pengguna'),
                'update' => $user->can('update-pengguna'),
                'delete' => $user->can('delete-pengguna'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Pengaturan/Pengguna/Index');
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
                    'label' => $item->name, // Sesuaikan dengan kolom yang digunakan sebagai label
                ];
            }),
            200
        );
    }
}
