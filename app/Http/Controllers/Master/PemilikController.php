<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Master\Pemilik\StorePemilik;
use App\Http\Requests\Master\Pemilik\UpdatePemilik;
use App\Models\User;
use App\Repositories\Master\PemilikRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\Middleware;

class PemilikController extends Controller
{
    protected PemilikRepository $repository;

    public function __construct(PemilikRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:pemilik-index', only: ['index', 'data']),
            new Middleware('can:pemilik-create', only: ['store']),
            new Middleware('can:pemilik-update', only: ['update']),
            new Middleware('can:pemilik-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('pemilik-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('pemilik-create'),
                'update' => $user->can('pemilik-update'),
                'delete' => $user->can('pemilik-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/Pemilik/Index', compact("gate"));
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
    public function store(StorePemilik $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePemilik $request, User $pemilik)
    {
        $this->repository->update($pemilik->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $pemilik)
    {
        $this->repository->delete($pemilik->id);
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
