<?php

use App\Http\Controllers\configuracion\AreasController;
use App\Http\Controllers\configuracion\TrabajadoresController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('configuracion')->group(function () {
        Route::get('areas', [AreasController::class, 'index'])->name('areas.index');
        Route::get('areas/crear', [AreasController::class, 'create'])->name('areas.create');
        Route::post('areas', [AreasController::class, 'store'])->name('areas.store');
        Route::get('areas/edit/{area}', [AreasController::class, 'edit'])->name('areas.edit');
        Route::put('areas/{area}', [AreasController::class, 'update'])->name('areas.update');


        Route::get('trabajadores', [TrabajadoresController::class, 'index'])->name('trabajadores.index');
        Route::get('trabajadores/crear', [TrabajadoresController::class, 'create'])->name('trabajadores.create');
        Route::post('trabajadores', [TrabajadoresController::class, 'store'])->name('trabajadores.store');
        Route::get('trabajadores/edit/{trabajador}', [TrabajadoresController::class, 'edit'])->name('trabajadores.edit');
        Route::post('trabajadores/{trabajador}', [TrabajadoresController::class, 'update'])->name('trabajadores.update');

        Route::get('trabajadores/ine_fotos/{filename}', [TrabajadoresController::class, 'verFotoIne'])->name('trabajadores.ver-foto-ine');
    });
});
