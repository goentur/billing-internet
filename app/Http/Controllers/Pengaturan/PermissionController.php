<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Pengaturan\Permission\StorePermission;
use App\Http\Requests\Pengaturan\Permission\UpdatePermission;
use App\Models\Permission;
use App\Repositories\Pengaturan\PermissionRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

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
            new Middleware('can:permission-index', only: ['index', 'data']),
            new Middleware('can:permission-create', only: ['store']),
            new Middleware('can:permission-update', only: ['update']),
            new Middleware('can:permission-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('permission-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('permission-create'),
                'update' => $user->can('permission-update'),
                'delete' => $user->can('permission-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Pengaturan/Permission/Index', compact("gate"));
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
