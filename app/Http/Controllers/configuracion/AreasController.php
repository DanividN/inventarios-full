<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\Estados;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $areas = areas::all();

        return Inertia::render('configuracion/areas/index', [
            'areas' => $areas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = areas::all();
        $estados = Estados::all();

        return Inertia::render('configuracion/areas/create', [
            'areas' => $areas,
            'estados' => $estados
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'area_padre_id' => 'required',
            'name' => 'required',
            'nomenclatura' => 'required',
            'telefono' => 'required',
            'calle' => 'required',
            'numero_exterior' => 'required',
            'colonia' => 'required',
            'codigo_postal' => 'required',
            'municipio_id' => 'required',
        ]);

        $data = $request->all();

        areas::create($data);

       return redirect()->route('areas.index')->with('successMessage', 'Área creada correctamente');

    }

    public function edit(string $area)
    {
        // traer el area con los municipios y de municipios traer el estado

        $area = areas::with('municipio.estado')->find($area);
        $areas = areas::all();
        $estados = Estados::all();
        return Inertia::render('configuracion/areas/edit', [
            'area' => $area,
            'areas' => $areas,
            'estados' => $estados
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $area)
    {
        $request->validate([
            'area_padre_id' => 'required',
            'name' => 'required',
            'nomenclatura' => 'required',
            'telefono' => 'required',
            'calle' => 'required',
            'numero_exterior' => 'required',
            'colonia' => 'required',
            'codigo_postal' => 'required',
            'municipio_id' => 'required',
        ]);

        $data = $request->all();

        areas::find($area)->update($data);

       return redirect()->route('areas.index')->with([
        'successMessage' => 'Área actualizada correctamente'
    ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
