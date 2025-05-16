<?php

use App\Http\Controllers\Api\FullApiController;
use Illuminate\Support\Facades\Route;

Route::controller(FullApiController::class)->group(function () {
    Route::get('data-pelanggan', 'dataPelanggan');
});
