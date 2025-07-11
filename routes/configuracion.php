<?php

use App\Http\Controllers\configuracion\AreasController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('configuracion')->group(function () {
        Route::get('areas', [AreasController::class, 'index'])->name('areas.index');
        Route::get('areas/crear', [AreasController::class, 'create'])->name('areas.create');
        Route::post('areas', [AreasController::class, 'store'])->name('areas.store');
        Route::get('areas/edit/{area}', [AreasController::class, 'edit'])->name('areas.edit');
        Route::put('areas/{area}', [AreasController::class, 'update'])->name('areas.update');
    });
});
