<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Trabajadores;
use App\Models\funciones\ResguardosAsignados;
use Inertia\Inertia;


class ResguardosAsignadosController extends Controller
{
    public function index()
    {
        $resguardosAsignados = areas::withResguardoStats()->get();
        return Inertia::render('funciones/resguardosAsignados/index', [
            'resguardosAsignados' => $resguardosAsignados
        ]);
    }

    public function resguardatarios($id)
    {
        $resguardatarios = areas::detalleConResguardatarios($id);
        return Inertia::render('funciones/resguardosAsignados/resguardatarios', [
            'resguardatarios' => $resguardatarios
       ]);
    }

    public function show($id)
    {
        $resguardos = Trabajadores::ResguardosAsignados($id);
        return Inertia::render('funciones/resguardosAsignados/show', [
            'resguardos' => $resguardos
        ]);
    }
}
