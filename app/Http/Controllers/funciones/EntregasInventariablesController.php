<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\funciones\BienesInventariable;
use App\Models\funciones\EntregasInventariables;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EntregasInventariablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $inventariables = BienesInventariable::where('tipo', 'almacen')->get();
        return Inertia::render('funciones/entregasInventariables/index', [
            'inventariables' => $inventariables
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = areas::all();
        $clasificaciones = Clasificacion::all();
        return Inertia::render('funciones/entregasInventariables/create', [
            'areas' => $areas,
            'clasificaciones' => $clasificaciones
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'area_id' => 'required',
            'enlace' => 'required',
            'entregado_por' => 'required|string|max:255',
        ]);

        //se recibe el array de articulos_entregados
        $articulos = $request->input('articulos_entregados', []);

        foreach ($articulos as $articuloId) {
            $bien = BienesInventariable::find($articuloId['id']);
            if ($bien) {
                $bien->tipo = 'asignado';
                $bien->area_id = $request->input('area_id');
                $bien->save();
            }
        }

        //crear folio de entrega revisando si ya existe un registro en la tabla entregas_inventariables
        $existeRegistro = EntregasInventariables::exists();
        if ($existeRegistro) {
            $ultimoFolio = EntregasInventariables::count();
            $nuevoFolio = $ultimoFolio + 1;
        } else {
            $nuevoFolio = 1;
        }
        $folio_armado = 'FE-'.str_pad($nuevoFolio, 4, '0', STR_PAD_LEFT);
        EntregasInventariables::create([
            'folio' => $folio_armado,
            'area_id' => $request->input('area_id'),
            'enlace' => $request->input('enlace'),
            'entregado_por' => $request->input('entregado_por'),
            'descripcion' => $request->input('description'),
        ]);

        //crear detalle de entrega
        $entrega = EntregasInventariables::latest()->first();
        foreach ($articulos as $articuloId) {
            $entrega->DetalleEntregaInventariable()->create([
                'entrega_inventariable_id' => $entrega->id,
                'bienes_inventariable_id' => $articuloId['id'],
            ]);
        }

        $bienes = BienesInventariable::whereIn('id', collect($articulos)->pluck('id'))->get();

        $pdf = Pdf::loadView('pdf.entrega-inventariable', [
            'entrega' => $entrega,
            'bienes' => $bienes,
        ]);

            // Guardar el PDF en storage/app/public/entregas/
        $pdfPath = 'entregas/' . $folio_armado . '.pdf';
        Storage::disk('public')->put($pdfPath, $pdf->output());

        $publicUrl = asset('storage/' . $pdfPath);

        // (opcional) Guardar ruta del PDF en la base de datos
        $entrega->documento_entrega = $publicUrl;
        $entrega->save();

        return redirect()->route('entregas.inventariables.index');
    }

    /**
     * Display the specified resource.
     */
    public function historial(){
        $entregas = EntregasInventariables::with('DetalleEntregaInventariable.bienesInventariable', 'area')->get();
        return Inertia::render('funciones/entregasInventariables/history', [
            'entregas' => $entregas
        ]);
    }

    public function docInventariableFirmado(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,png,jpg|max:2048',
            'id'   => 'required|integer|exists:entregas_inventariables,id',
        ]);


        // Guarda el archivo en storage/app/public/entregas_firmados
        $path = $request->file('file')->store('inventariables/entregas_firmados', 'public');

        $publicUrl = asset('storage/' . $path);

        EntregasInventariables::where('id', $request->input('id'))
            ->update(['documento_firmado' => $publicUrl]);

        // Devolver la ruta en flash para que React actualice el enlace
        return redirect()->back()->with('file', $path);
    }
}
