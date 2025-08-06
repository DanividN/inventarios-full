<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\funciones\BienesInventariable;
use App\Models\funciones\EntregasInventariables;
use Illuminate\Http\Request;
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
            $ultimoFolio = EntregasInventariables::max('folio');
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
}
