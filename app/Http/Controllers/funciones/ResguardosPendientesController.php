<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\funciones\ResguardosPendientes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResguardosPendientesController extends Controller
{
    public function index()
    {
        $pendientes = ResguardosPendientes::with('trabajador', 'bienesInventariable.area')->get();
        $areas = areas::all();
        return Inertia::render('funciones/resguardosPendientes/index', [
            'pendientes' => $pendientes,
            'areas' => $areas
        ]);
    }

    public function store(Request $request)
    {
        ResguardosPendientes::create($request->all());
        return redirect()->back();
    }

    public function show($id)
    {
        $resguardo = ResguardosPendientes::with('trabajador', 'bienesInventariable.area', 'bienesInventariable.clasificacion', 'bienesInventariable.proveedor')->find($id);
        return Inertia::render('funciones/resguardosPendientes/show', [
            'resguardo' => $resguardo
        ]);
    }

    public function formatoFirmadoCarga(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,png,jpg|max:2048',
            'id'   => 'required|integer|exists:resguardos_pendientes,id',
        ]);

        // Guarda el archivo en storage/app/public/resguardos_firmados
        $path = $request->file('file')->store('resguardos_firmados', 'public');

        ResguardosPendientes::where('id', $request->input('id'))
            ->update(['resguardo_firma' => $path]);

        // Devolver la ruta en flash para que React actualice el enlace
        return redirect()->back()->with('file', $path);
    }
}
