<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\ZonaWaktu;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class ZonaWaktuController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('can:index-zona-waktu', only: ['index', 'show']),
            new Middleware('can:create-zona-waktu', only: ['create', 'store']),
            new Middleware('can:update-zona-waktu', only: ['edit', 'update']),
            new Middleware('can:delete-zona-waktu', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Cache::remember(__CLASS__ . $user->getKey(), config('cache.lifetime.hour'), function () use ($user) {
            return [
                'create' => $user->can('create-zona-waktu'),
                'update' => $user->can('update-zona-waktu'),
                'delete' => $user->can('delete-zona-waktu'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Master/ZonaWaktu/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ZonaWaktu $zonaWaktu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ZonaWaktu $zonaWaktu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ZonaWaktu $zonaWaktu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ZonaWaktu $zonaWaktu)
    {
        //
    }
}
