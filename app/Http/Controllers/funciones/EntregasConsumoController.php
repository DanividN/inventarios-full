<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\funciones\BienesConsumo;
use App\Models\funciones\EntregasConsumo;
use Illuminate\Http\Request;
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

        return redirect()->route('entregas.consumo.index');
    }

    public function historial(){
        $entregas = EntregasConsumo::with('DetalleEntregaConsumo', 'area')->get();
        return Inertia::render('funciones/entregasConsumo/history', [
            'entregas' => $entregas
        ]);
    }
}
