<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pengaturan\Permission\StorePermission;
use App\Http\Requests\Pengaturan\Permission\UpdatePermission;
use App\Models\Permission;
use App\Repositories\Pengaturan\PermissionRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class PermissionController extends Controller implements HasMiddleware
{
    protected PermissionRepository $repository;

    public function __construct(PermissionRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:index-permission', only: ['index', 'data']),
            new Middleware('can:create-permission', only: ['store']),
            new Middleware('can:update-permission', only: ['update']),
            new Middleware('can:delete-permission', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('create-permission'),
                'update' => $user->can('update-permission'),
                'delete' => $user->can('delete-permission'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Pengaturan/Permission/Index');
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
    public function store(StorePermission $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermissionRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermission $request, Permission $permission)
    {
        $this->repository->update($permission->uuid, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $this->repository->delete($permission->uuid);
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
                    'value' => $item->uuid,
                    'label' => $item->name,
                ];
            }),
            200
        );
    }
}
