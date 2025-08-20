<?php

use App\Http\Controllers\funciones\BienesConsumoController;
use App\Http\Controllers\funciones\BienesInventariablesController;
use App\Http\Controllers\funciones\EntregasConsumoController;
use App\Http\Controllers\funciones\EntregasInventariablesController;
use App\Http\Controllers\funciones\ResguardosPendientesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('funciones')->name('funciones.')->group(function () {
    // Inventarios
    Route::prefix('inventarios')->name('inventarios.')->group(function () {
        // Bienes Inventariables
        Route::prefix('inventariables')->name('inventariables.')->controller(BienesInventariablesController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/crear', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/edit/{bienes_inventariable}', 'edit')->name('edit');
            Route::post('/{bienes_inventariable}', 'update')->name('update');
            Route::get('/{filename}', 'verImagenes')->name('verImagenes');
            Route::put('/baja/{bienes_inventariable}', 'baja')->name('baja');
        });
        // Bienes de Consumo
        Route::prefix('consumo')->name('consumo.')->controller(BienesConsumoController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/crear', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/historial/{articulo}', 'historial')->name('historial');
        });
    });

    // Entregas
    Route::prefix('entregas')->name('entregas.')->group(function () {
        // Entregas Inventariables
        Route::prefix('inventariables')->name('inventariables.')->controller(EntregasInventariablesController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/crear', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/historial', 'historial')->name('history');
        });
        // Entregas Consumo
        Route::prefix('consumo')->name('consumo.')->controller(EntregasConsumoController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/crear', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/historial', 'historial')->name('history');
        });
    });

    // Resguardos
    Route::prefix('resguardos')->name('resguardos.')->group(function () {
        //Resguardos Pendientes
        Route::prefix('pendientes')->name('pendientes.')->controller(ResguardosPendientesController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
        });
    });
});
