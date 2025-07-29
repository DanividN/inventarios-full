<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\MunicipiosController;
use App\Models\Municipios;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

   Route::get('/municipios/{estado}', [MunicipiosController::class, 'getMunicipios']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/configuracion.php';
require __DIR__.'/funciones.php';
