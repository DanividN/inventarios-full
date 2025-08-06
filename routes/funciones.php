<?php

use App\Http\Controllers\funciones\BienesConsumoController;
use App\Http\Controllers\funciones\BienesInventariablesController;
use App\Http\Controllers\funciones\EntregasInventariablesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('funciones/inventarios')->group(function () {
        Route::get('inventariables', [BienesInventariablesController::class, 'index'])->name('inventariables.index');
        Route::get('inventariables/crear', [BienesInventariablesController::class, 'create'])->name('inventariables.create');
        Route::post('inventariables', [BienesInventariablesController::class, 'store'])->name('inventariables.store');
        Route::get('inventariables/edit/{bienes_inventariable}', [BienesInventariablesController::class, 'edit'])->name('inventariables.edit');
        Route::post('inventariables/{bienes_inventariable}', [BienesInventariablesController::class, 'update'])->name('inventariables.update');
        Route::get('inventariables/{filename}', [BienesInventariablesController::class, 'verImagenes'])->name('inventariables.verImagenes');
        Route::put('inventariables/baja/{bienes_inventariable}', [BienesInventariablesController::class, 'baja'])->name('inventariables.baja');

        Route::get('consumo', [BienesConsumoController::class, 'index'])->name('consumo.index');
        Route::get('consumo/crear', [BienesConsumoController::class, 'create'])->name('consumo.create');
        Route::post('consumo', [BienesConsumoController::class, 'store'])->name('consumo.store');
        Route::get('consumo/historial/{articulo}', [BienesConsumoController::class, 'historial'])->name('consumo.historial');
    });

    Route::prefix('funciones/entregas')->group(function () {
        Route::get('inventariables', [EntregasInventariablesController::class, 'index'])->name('entregas.inventariables.index');
        Route::get('inventariables/crear', [EntregasInventariablesController::class, 'create'])->name('entregas.inventariables.create');
        Route::post('inventariables', [EntregasInventariablesController::class, 'store'])->name('entregas.inventariables.store');
        Route::get('inventariables/historial', [EntregasInventariablesController::class, 'historial'])->name('entregas.inventariables.history');
    });
});
