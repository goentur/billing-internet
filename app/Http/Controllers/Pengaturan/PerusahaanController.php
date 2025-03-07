<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pengaturan\Perusahaan\UpdatePerusahaan;
use App\Repositories\Master\PerusahaanRepository;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Artisan;

class PerusahaanController extends Controller implements HasMiddleware
{
    protected PerusahaanRepository $repository;

    public function __construct(PerusahaanRepository $repository)
    {
        $this->repository = $repository;
    }

    public static function middleware(): array
    {
        return [
            new Middleware('can:pengaturan-perusahaan'),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $perusahaan = $user?->perusahaan[0] ?? null;
        $logo = asset('storage/' . $perusahaan->logo);
        return inertia('Pengaturan/Perusahaan/Index', compact('perusahaan', 'logo'));
    }

    /**
     * For fresh system.
     */
    public function update(UpdatePerusahaan $request, $id)
    {
        $this->repository->update($id, $request);
        Artisan::call('optimize:clear');
        back()->with('success', 'Data berhasil diubah');
    }
}
