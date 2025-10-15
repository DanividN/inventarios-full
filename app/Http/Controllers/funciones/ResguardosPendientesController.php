<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\funciones\ResguardosPendientes;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResguardosPendientesController extends Controller
{
    public function index()
    {
        $pendientes = ResguardosPendientes::with('trabajador', 'bienesInventariable.area')->whereNull('resguardo_firma')->get();
        $areas = areas::all();
        return Inertia::render('funciones/resguardosPendientes/index', [
            'pendientes' => $pendientes,
            'areas' => $areas
        ]);
    }

    public function store(Request $request)
    {
       $pendientes = ResguardosPendientes::create($request->all());
        // crear pdf y guardarlo en storage/app/public/resguardos_pendientes
        $pdf = Pdf::loadView('pdf.documento-resguardo', [
            'resguardo' => $pendientes->load('trabajador', 'bienesInventariable.area', 'bienesInventariable.clasificacion', 'bienesInventariable.proveedor')
        ]);
        $pdfPath = 'resguardos_pendientes/' . 'Creg-' . $pendientes->creg . '.pdf';
        Storage::disk('public')->put($pdfPath, $pdf->output());

        $publicUrl = asset('storage/' . $pdfPath);

        $pendientes->formato_resguardo = $publicUrl;
        $pendientes->save();

        return redirect()->back();
    }

    public function show($id)
    {
        $resguardo = ResguardosPendientes::with('trabajador', 'bienesInventariable.area', 'bienesInventariable.clasificacion', 'bienesInventariable.proveedor')->find($id);
        $bien_id = $resguardo->bienesInventariable->id;
        $historial_resguardos = ResguardosPendientes::where('bienes_inventariable_id', $bien_id)->with('trabajador')->orderBy('created_at', 'desc')->get();
        return Inertia::render('funciones/resguardosPendientes/show', [
            'resguardo' => $resguardo,
            'historial_resguardos' => $historial_resguardos
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

        $publicUrl = asset('storage/' . $path);

        ResguardosPendientes::where('id', $request->input('id'))
            ->update(['resguardo_firma' => $publicUrl]);

        // Devolver la ruta en flash para que React actualice el enlace
        return redirect()->route('resguardos.pendientes.index')->with('file', $path);
    }
}
