<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\funciones\BienesConsumoController;
use App\Http\Controllers\funciones\BienesInventariablesController;
use App\Http\Controllers\MunicipiosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

   Route::get('/municipios/{estado}', [MunicipiosController::class, 'getMunicipios']);
   Route::get('getArticulos/{clasificacion}', [BienesConsumoController::class, 'getArticulos'])->name('consumo.getArticulos');
   Route::get('getUnidad/{articulo}', [BienesConsumoController::class, 'getUnidad'])->name('consumo.getUnidad');
   Route::get('articulos/{articulo}', [BienesInventariablesController::class, 'getArticulo'])->name('inventariable.getArticulo');
   Route::get('articulosConsumible/{clasificacion}', [BienesConsumoController::class, 'getArticulosConsumible'])->name('consumo.getArticulosConsumible');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/configuracion.php';
require __DIR__.'/funciones.php';
