<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\funciones\BienesConsumo;
use App\Models\funciones\EntregasConsumo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EntregasConsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $consumos= BienesConsumo::indexTable();
        return Inertia::render('funciones/entregasConsumo/index',
        [
            'consumos'=>$consumos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = areas::all();
        $clasificaciones = Clasificacion::all();
        return Inertia::render('funciones/entregasConsumo/create', [
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

        $existeRegistro = EntregasConsumo::exists();
        if ($existeRegistro) {
            $ultimoFolio = EntregasConsumo::max('folio');
            $numero = (int) substr($ultimoFolio, 4); // desde el índice 4 en adelante
            $nuevoFolio = $numero + 1;
        } else {
            $nuevoFolio = 1;
        }
        $folio_armado = 'CON-' . str_pad($nuevoFolio, 5, '0', STR_PAD_LEFT);

        EntregasConsumo::create([
            'folio' => $folio_armado,
            'area_id' => $request->area_id,
            'enlace' => $request->enlace,
            'entregado_por' => $request->entregado_por,
            'descripcion' => $request->description
        ]);

        $articulos = $request->input('articulos_entregados', []);
        $entrega = EntregasConsumo::latest()->first();
        foreach($articulos as $articuloId){
            $entrega->DetalleEntregaConsumo()->create([
                'entrega_consumo_id' => $entrega->id,
                'articulo_id' => $articuloId['id'],
                'cantidad' => $articuloId['cantidad_asignada'],
            ]);
        }

        $bienes = BienesConsumo::whereIn('id', collect($articulos)->pluck('id'))->get();

        $pdf = Pdf::loadView('pdf.entrega-consumo', [
            'entrega' => $entrega,
            'bienes' => $bienes,
        ]);

        // Guardar el PDF en storage/app/public/entregas/
        $pdfPath = 'entregasConsumo/' . $folio_armado . '.pdf';
        Storage::disk('public')->put($pdfPath, $pdf->output());

        $publicUrl = asset('storage/' . $pdfPath);

        //Guardar ruta del PDF en la base de datos
        $entrega->documento_entrega = $publicUrl;
        $entrega->save();

        return redirect()->route('entregas.consumo.index');
    }

    public function historial(){
        $entregas = EntregasConsumo::with('DetalleEntregaConsumo', 'area')->get();
        return Inertia::render('funciones/entregasConsumo/history', [
            'entregas' => $entregas
        ]);
    }

    public function docConsumoFirmado(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,png,jpg|max:2048',
            'id'   => 'required|integer|exists:entregas_consumos,id',
        ]);


        // Guarda el archivo en storage/app/public/entregas_firmados
        $path = $request->file('file')->store('entregas_firmados', 'public');

        $publicUrl = asset('storage/' . $path);

        EntregasConsumo::where('id', $request->input('id'))
            ->update(['documento_firmado' => $publicUrl]);

        // Devolver la ruta en flash para que React actualice el enlace
        return redirect()->back()->with('file', $path);
    }
}
