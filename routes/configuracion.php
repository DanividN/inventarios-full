<?php

use App\Http\Controllers\configuracion\AreasController;
use App\Http\Controllers\configuracion\ArticulosController;
use App\Http\Controllers\configuracion\ClasificacionController;
use App\Http\Controllers\configuracion\ProveedoresController;
use App\Http\Controllers\configuracion\TrabajadoresController;
use App\Models\configuracion\Clasificacion;
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

        Route::get('proveedores', [ProveedoresController::class, 'index'])->name('proveedores.index');
        Route::get('proveedores/crear', [ProveedoresController::class, 'create'])->name('proveedores.create');
        Route::post('proveedores', [ProveedoresController::class, 'store'])->name('proveedores.store');
        Route::get('proveedores/edit/{proveedor}', [ProveedoresController::class, 'edit'])->name('proveedores.edit');
        Route::put('proveedores/{proveedor}', [ProveedoresController::class, 'update'])->name('proveedores.update');
        Route::put('proveedores/{proveedor}/toggle-estatus', [ProveedoresController::class, 'toggleEstatus'])->name('proveedores.toggle-estatus');

        Route::get('clasificacion', [ClasificacionController::class, 'index'])->name('clasificacion.index');
        Route::get('clasificacion/crear', [ClasificacionController::class, 'create'])->name('clasificacion.create');
        Route::post('clasificacion', [ClasificacionController::class, 'store'])->name('clasificacion.store');
        Route::get('clasificacion/edit/{clasificacion}', [ClasificacionController::class, 'edit'])->name('clasificacion.edit');
        Route::put('clasificacion/{clasificacion}', [ClasificacionController::class, 'update'])->name('clasificacion.update');

        Route::get('articulos', [ArticulosController::class, 'index'])->name('articulos.index');
        Route::get('articulos/crear', [ArticulosController::class, 'create'])->name('articulos.create');
        Route::post('articulos', [ArticulosController::class, 'store'])->name('articulos.store');
        Route::get('articulos/edit/{articulo}', [ArticulosController::class, 'edit'])->name('articulos.edit');
        Route::put('articulos/{articulo}', [ArticulosController::class, 'update'])->name('articulos.update');
    });
});
