<?php

use App\Http\Controllers\funciones\BienesInventariablesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('funciones')->group(function () {
        Route::get('inventarios/inventariables', [BienesInventariablesController::class, 'index'])->name('inventariables.index');
        Route::get('inventarios/inventariables/crear', [BienesInventariablesController::class, 'create'])->name('inventariables.create');
        Route::post('inventarios/inventariables', [BienesInventariablesController::class, 'store'])->name('inventariables.store');
        Route::get('inventarios/inventariables/edit/{bienes_inventariable}', [BienesInventariablesController::class, 'edit'])->name('inventariables.edit');
        Route::post('inventarios/inventariables/{bienes_inventariable}', [BienesInventariablesController::class, 'update'])->name('inventariables.update');
        Route::get('inventarios/inventariables/{filename}', [BienesInventariablesController::class, 'verImagenes'])->name('inventariables.verImagenes');
        Route::put('inventarios/inventariables/baja/{bienes_inventariable}', [BienesInventariablesController::class, 'baja'])->name('inventariables.baja');
    });
});
