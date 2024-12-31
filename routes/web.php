<?php

use App\Http\Controllers\Master\PaketInternetController;
use App\Http\Controllers\Master\PelangganController;
use App\Http\Controllers\Master\PerusahaanController;
use App\Http\Controllers\Master\ZonaWaktuController;
use App\Http\Controllers\ProfileController;
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
        Route::resources([
            'zona-waktu' => ZonaWaktuController::class,
            'peruahaan' => PerusahaanController::class,
            'paket-internet' => PaketInternetController::class,
            'pelanggan' => PelangganController::class,
            'pemilik' => ZonaWaktuController::class,
            'pegawai' => ZonaWaktuController::class,
            'pengguna' => ZonaWaktuController::class,
            'role' => ZonaWaktuController::class,
            'permission' => ZonaWaktuController::class
        ]);
    });
});

require __DIR__ . '/auth.php';
