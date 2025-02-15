<?php

use App\Http\Controllers\Master\PaketInternetController;
use App\Http\Controllers\Master\PelangganController;
use App\Http\Controllers\Master\PemilikController;
use App\Http\Controllers\Master\PerusahaanController;
use App\Http\Controllers\Master\ZonaWaktuController;
use App\Http\Controllers\Pengaturan\PenggunaController;
use App\Http\Controllers\Pengaturan\PermissionController;
use App\Http\Controllers\Pengaturan\RoleController;
use App\Http\Controllers\ProfileController;
use App\Models\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('login');
})->name('/');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::prefix('master')->name('master.')->group(function () {
        Route::prefix('zona-waktu')->name('zona-waktu.')->group(function () {
            Route::post('data', [ZonaWaktuController::class, 'data'])->name('data');
            Route::post('all-data', [ZonaWaktuController::class, 'allData'])->name('all-data');
        });
        Route::prefix('perusahaan')->name('perusahaan.')->group(function () {
            Route::post('data', [PerusahaanController::class, 'data'])->name('data');
            Route::post('all-data', [PerusahaanController::class, 'allData'])->name('all-data');
        });
        Route::prefix('pemilik')->name('pemilik.')->group(function () {
            Route::post('data', [PemilikController::class, 'data'])->name('data');
        });
        Route::resources([
            'zona-waktu' => ZonaWaktuController::class,
            'perusahaan' => PerusahaanController::class,
            'paket-internet' => PaketInternetController::class,
            'pelanggan' => PelangganController::class,
            'pemilik' => PemilikController::class,
            'pegawai' => ZonaWaktuController::class,
        ]);
    });
    Route::prefix('pengaturan')->name('pengaturan.')->group(function () {
        Route::prefix('pengguna')->name('pengguna.')->group(function () {
            Route::post('data', [PenggunaController::class, 'data'])->name('data');
        });
        Route::prefix('role')->name('role.')->group(function () {
            Route::post('data', [RoleController::class, 'data'])->name('data');
            Route::post('all-data', [RoleController::class, 'allData'])->name('all-data');
        });
        Route::prefix('permission')->name('permission.')->group(function () {
            Route::post('data', [PermissionController::class, 'data'])->name('data');
            Route::post('all-data', [PermissionController::class, 'allData'])->name('all-data');
        });
        Route::resources([
            'pengguna' => PenggunaController::class,
            'role' => RoleController::class,
            'permission' => PermissionController::class
        ]);
    });
});

require __DIR__ . '/auth.php';
