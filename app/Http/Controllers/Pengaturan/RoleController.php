<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Pengaturan\Role\StoreRole;
use App\Http\Requests\Pengaturan\Role\UpdateRole;
use App\Models\Role;
use App\Repositories\Pengaturan\RoleRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    protected RoleRepository $repository;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:role-index', only: ['index', 'data']),
            new Middleware('can:role-create', only: ['store']),
            new Middleware('can:role-update', only: ['update']),
            new Middleware('can:role-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('role-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('role-create'),
                'update' => $user->can('role-update'),
                'delete' => $user->can('role-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Pengaturan/Role/Index', compact("gate"));
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
    public function store(StoreRole $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoleRepository $repository)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRole $request, Role $role)
    {
        $this->repository->update($role->uuid, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $this->repository->delete($role->uuid);
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
