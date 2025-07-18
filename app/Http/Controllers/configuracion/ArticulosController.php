<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use App\Models\configuracion\Articulos;
use App\Models\configuracion\Clasificacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticulosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $articulos = Articulos::with('clasificacion')->get();

        return Inertia::render('configuracion/articulos/index', [
            'articulos' => $articulos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clasificaciones = Clasificacion::all();
        return Inertia::render('configuracion/articulos/create', [
            'clasificaciones' => $clasificaciones
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'clasificacion_id' => 'required',
            'articulo' => 'required',
            'unidad_medida' => 'required',
            'tipo' => 'required',
            'stock_minimo' => 'required',
            'numero_parte' => 'required',
            'descripcion' => 'required',
        ]);

        Articulos::create([
            'clasificacion_id' => $request->clasificacion_id,
            'articulo' => $request->articulo,
            'unidad_medida' => $request->unidad,
            'tipo' => $request->tipo,
            'stock_minimo' => $request->stock_minimo,
            'numero_parte' => $request->numero_parte,
            'descripcion' => $request->descripcion
        ]);

        return redirect()->route('articulos.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $articulo)
    {
        $articulos = Articulos::with('clasificacion')->find($articulo);
        $clasificaciones = Clasificacion::all();
        return Inertia::render('configuracion/articulos/edit', [
            'articulos' => $articulos,
            'clasificaciones' => $clasificaciones
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'clasificacion_id' => 'required',
            'articulo' => 'required',
            'unidad_medida' => 'required',
            'tipo' => 'required',
            'stock_minimo' => 'required',
            'numero_parte' => 'required',
            'descripcion' => 'required',
        ]);

        Articulos::find($id)->update([
            'clasificacion_id' => $request->clasificacion_id,
            'articulo' => $request->articulo,
            'unidad_medida' => $request->unidad_medida,
            'tipo' => $request->tipo,
            'stock_minimo' => $request->stock_minimo,
            'numero_parte' => $request->numero_parte,
            'descripcion' => $request->descripcion
        ]);

        return redirect()->route('articulos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
