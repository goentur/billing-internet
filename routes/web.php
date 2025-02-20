<?php

use App\Http\Controllers\Master\OdpController;
use App\Http\Controllers\Master\PaketInternetController;
use App\Http\Controllers\Master\PegawaiController;
use App\Http\Controllers\Master\PelangganController;
use App\Http\Controllers\Master\PemilikController;
use App\Http\Controllers\Master\PerusahaanController;
use App\Http\Controllers\Master\ZonaWaktuController;
use App\Http\Controllers\Pengaturan\PenggunaController;
use App\Http\Controllers\Pengaturan\PermissionController;
use App\Http\Controllers\Pengaturan\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Transaksi\PembayaranController;
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
            Route::middleware('can:zona-waktu-index')->post('data', [ZonaWaktuController::class, 'data'])->name('data');
            Route::post('all-data', [ZonaWaktuController::class, 'allData'])->name('all-data');
        });
        Route::prefix('perusahaan')->name('perusahaan.')->group(function () {
            Route::middleware('can:perusahaan-index')->post('data', [PerusahaanController::class, 'data'])->name('data');
            Route::post('all-data', [PerusahaanController::class, 'allData'])->name('all-data');
        });
        Route::prefix('pemilik')->name('pemilik.')->group(function () {
            Route::middleware('can:pemilik-index')->post('data', [PemilikController::class, 'data'])->name('data');
        });
        Route::prefix('paket-internet')->name('paket-internet.')->group(function () {
            Route::middleware('can:paket-internet-index')->post('data', [PaketInternetController::class, 'data'])->name('data');
            Route::post('all-data', [PaketInternetController::class, 'allData'])->name('all-data');
        });
        Route::prefix('odp')->name('odp.')->group(function () {
            Route::middleware('can:odp-index')->post('data', [OdpController::class, 'data'])->name('data');
            Route::post('all-data', [OdpController::class, 'allData'])->name('all-data');
        });
        Route::prefix('pelanggan')->name('pelanggan.')->group(function () {
            Route::middleware('can:pelanggan-index')->post('data', [PelangganController::class, 'data'])->name('data');
            Route::post('all-data', [PelangganController::class, 'allData'])->name('all-data');
        });
        Route::prefix('pegawai')->name('pegawai.')->group(function () {
            Route::middleware('can:pegawai-index')->post('data', [PegawaiController::class, 'data'])->name('data');
        });
        Route::resource('zona-waktu', ZonaWaktuController::class)->middleware('can:zona-waktu-index');
        Route::resource('perusahaan', PerusahaanController::class)->middleware('can:perusahaan-index');
        Route::resource('paket-internet', PaketInternetController::class)->middleware('can:paket-internet-index');
        Route::resource('odp', OdpController::class)->middleware('can:odp-index');
        Route::resource('pelanggan', PelangganController::class)->middleware('can:pelanggan-index');
        Route::resource('pemilik', PemilikController::class)->middleware('can:pemilik-index');
        Route::resource('pegawai', PegawaiController::class)->middleware('can:pegawai-index');
    });
    Route::prefix('pengaturan')->name('pengaturan.')->group(function () {
        Route::prefix('pengguna')->name('pengguna.')->group(function () {
            Route::middleware('can:pengguna-index')->post('data', [PenggunaController::class, 'data'])->name('data');
        });
        Route::prefix('role')->name('role.')->group(function () {
            Route::middleware('can:role-index')->post('data', [RoleController::class, 'data'])->name('data');
            Route::post('all-data', [RoleController::class, 'allData'])->name('all-data');
        });
        Route::prefix('permission')->name('permission.')->group(function () {
            Route::middleware('can:permission-index')->post('data', [PermissionController::class, 'data'])->name('data');
            Route::post('all-data', [PermissionController::class, 'allData'])->name('all-data');
        });
        Route::resource('pengguna', PenggunaController::class)->middleware('can:pengguna-index');
        Route::resource('role', RoleController::class)->middleware('can:role-index');
        Route::resource('permission', PermissionController::class)->middleware('can:permission-index');
    });
    Route::prefix('transaksi')->name('transaksi.')->group(function () {
        Route::prefix('pembayaran')->name('pembayaran.')->group(function () {
            Route::middleware('can:pembayaran-index')->group(function () {
                Route::get('/', [PembayaranController::class, 'index'])->name('index');
                Route::post('data', [PembayaranController::class, 'data'])->name('data');
            });
            Route::middleware('can:pembayaran-create')->post('store', [PembayaranController::class, 'store'])->name('store');
        });
    });
});

require __DIR__ . '/auth.php';
