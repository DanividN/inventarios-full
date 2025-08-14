<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\Articulos;
use App\Models\configuracion\Clasificacion;
use App\Models\configuracion\Proveedores;
use App\Models\funciones\BienesConsumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BienesConsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //suma la cantidad cuando los dos tengan el mismo articulo_id
        $consumos= BienesConsumo::indexTable();
        $clasificaciones = Clasificacion::all();
        $proveedores = Proveedores::all();
        return Inertia::render('funciones/bienesConsumo/index', [
            'consumos' => $consumos
            , 'clasificaciones' => $clasificaciones
            , 'proveedores' => $proveedores
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'clasificacion_id' => 'required',
            'articulo_id' => 'required',
            'proveedor_id' => 'required',
            'cantidad' => 'required',
            'unidad_medida' => 'required',
            'costo_unitario' => 'required',
            'costo_total' => 'required',
        ]);

        $data = $request->all();
        $recibe = Auth::user()->id;
        $data['recibe'] = $recibe;

        BienesConsumo::create($data);

        return redirect()->route('consumo.index');
    }

    public function historial($articulo)
    {
        $consumos = BienesConsumo::with(['articulo', 'clasificacion', 'proveedor', 'users'])
            ->where('articulo_id', $articulo)
            ->get();

        return Inertia::render('funciones/bienesConsumo/history', [
            'consumos' => $consumos
        ]);
    }

    public function getArticulos($clasificacion)
    {
        $articulos = Articulos::where('clasificacion_id', $clasificacion)->where('tipo', 'consumo')->get();
        return response()->json($articulos);
    }

    public function getUnidad($articulo)
    {
        $unidadMedida = Articulos::find($articulo);
        return response()->json($unidadMedida);
    }

    public function getArticulosConsumible($clasificacion)
    {
        $articulos = BienesConsumo::getArticulos($clasificacion);
        return response()->json($articulos);
    }
}
