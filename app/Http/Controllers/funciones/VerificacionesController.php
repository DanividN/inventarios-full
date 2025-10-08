<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Trabajadores;
use App\Models\funciones\BienesInventariable;
use App\Models\funciones\Verificaciones;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areasResguardos = areas::withResguardoStats()->get();
        return Inertia::render('funciones/verificaciones/index', [
            'areasResguardos' => $areasResguardos
        ]);
    }

    public function resguardatarios($id)
    {

        $verificaciones = Verificaciones::where('area_id', $id)->get();
        $verificador = Trabajadores::where('cargo', 'verificador')->get();
        $resguardatarios = areas::detalleConResguardatarios($id);
        return Inertia::render('funciones/verificaciones/resguardatarios', [
            'resguardatarios' => $resguardatarios,
            'verificador' => $verificador,
            'verificaciones' => $verificaciones
       ]);
    }

    public function show($id)
    {
        $resguardos = Trabajadores::ResguardosAsignados($id);
        return Inertia::render('funciones/verificaciones/show', [
            'resguardos' => $resguardos
        ]);
    }
}
