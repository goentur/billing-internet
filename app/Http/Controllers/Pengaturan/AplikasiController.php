<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Artisan;

class AplikasiController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('can:aplikasi-index'),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Pengaturan/Aplikasi/Index');
    }

    /**
     * For fresh system.
     */
    public function optimizeClear()
    {
        return response()->json(Artisan::call('optimize:clear'));
    }
}
