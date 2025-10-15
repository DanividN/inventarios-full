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

        $verificaciones = Verificaciones::with([
            'resguardatarios' => function ($q) {
                $q->with(['resguardosPendientes'])
                    ->withCount(['resguardosPendientes as resguardos_activos' => function ($query) {
                        $query->where('estatus', 'activo'); // o el campo que marque si está activo
                    }]);
            }
        ])
            ->where('area_id', $id)
            ->get();
        $verificador = Trabajadores::where('cargo', 'verificador')->get();
        $resguardatarios = areas::detalleConResguardatarios($id);
        return Inertia::render('funciones/verificaciones/resguardatarios', [
            'resguardatarios' => $resguardatarios,
            'verificador' => $verificador,
            'verificaciones' => $verificaciones
        ]);
    }

    public function store(Request $request)
    {
        foreach ($request->resguardatarios_id as $resguardo) {
            $verificacion = new Verificaciones();
            $verificacion->area_id = $request->area_id;
            $verificacion->verificador_id = $request->verificador_id;
            $verificacion->fecha_agendada = $request->fecha_agendada;
            $verificacion->hora_agendada = $request->hora_agendada;
            $verificacion->direccion = $request->direccion;
            $verificacion->periodo = $request->periodo;
            $verificacion->resguardatarios_id = $resguardo;
            $verificacion->save();
        }
        return redirect()->route('verificaciones.resguardatarios', $request->area_id);
    }

    public function show($id)
    {
        $resguardos = Trabajadores::ResguardosAsignados($id);
        return Inertia::render('funciones/verificaciones/show', [
            'resguardos' => $resguardos
        ]);
    }
}
