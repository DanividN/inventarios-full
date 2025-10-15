<?php

use App\Http\Controllers\estadisticas\ResguardosStatsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('estadisticas/resguardos', [ResguardosStatsController::class, 'resguardos'])->name('estadisticas.resguardos');
});
