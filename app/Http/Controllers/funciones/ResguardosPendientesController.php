<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\funciones\ResguardosPendientes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResguardosPendientesController extends Controller
{
    public function index(){
        $pendientes = ResguardosPendientes::all();
        return Inertia::render('funciones/resguardosPendientes/index', [
            'pendientes' => $pendientes
        ]);
    }
}
