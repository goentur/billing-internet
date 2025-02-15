<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Pemilik\StorePemilik;
use App\Http\Requests\Master\Pemilik\UpdatePemilik;
use App\Models\User;
use App\Repositories\Master\PemilikRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

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
            new Middleware('can:index-pemilik', only: ['index', 'data']),
            new Middleware('can:create-pemilik', only: ['store']),
            new Middleware('can:update-pemilik', only: ['update']),
            new Middleware('can:delete-pemilik', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('create-pemilik'),
                'update' => $user->can('update-pemilik'),
                'delete' => $user->can('delete-pemilik'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Master/Pemilik/Index');
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
    public function update(UpdatePemilik $request)
    {
        $this->repository->update($request->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $this->repository->delete($request->id);
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
