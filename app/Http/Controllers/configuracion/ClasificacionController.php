<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use App\Models\configuracion\Clasificacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClasificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $clasificacion = Clasificacion::all();
        return Inertia::render('configuracion/clasificacion/index', [
            'clasificacion' => $clasificacion
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('configuracion/clasificacion/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'clave' => 'required',
            'clasificacion' => 'required',
            'descripcion' => 'required',
        ]);

        Clasificacion::create($request->all());
        return redirect()->route('clasificacion.index')->with('success', 'Clasificación creada con éxito');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $clasificacion = Clasificacion::find($id);
        return Inertia::render('configuracion/clasificacion/edit', [
            'clasificacion' => $clasificacion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'clave' => 'required',
            'clasificacion' => 'required',
            'descripcion' => 'required',
        ]);

        Clasificacion::find($id)->update($request->all());
        return redirect()->route('clasificacion.index')->with('success', 'Clasificación actualizada con éxito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
