<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use App\Models\configuracion\Proveedores;
use App\Models\Estados;
use App\Models\Municipios;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProveedoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $proveedores = Proveedores::with('municipio.estado')->get();

        return Inertia::render('configuracion/proveedores/index', [
            'proveedores' => $proveedores
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $estados = Estados::all();

        return Inertia::render('configuracion/proveedores/create', [
            'estados' => $estados
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'rfc' => 'required',
            'telefono' => 'required',
            'calle' => 'required',
            'numero_exterior' => 'required',
            'colonia' => 'required',
            'codigo_postal' => 'required',
            'municipio_id' => 'required',
        ]);

        $data = $request->all();
        Proveedores::create($data);
        return redirect()->route('proveedores.index')->with('successMessage', 'Proveedor creado correctamente');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $proveedores = Proveedores::with('municipio.estado')->find($id);
        $estados = Estados::all();
        return Inertia::render('configuracion/proveedores/edit', [
            'proveedores' => $proveedores,
            'estados' => $estados
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $proveedor)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'rfc' => 'required',
            'telefono' => 'required',
            'calle' => 'required',
            'numero_exterior' => 'required',
            'colonia' => 'required',
            'codigo_postal' => 'required',
            'municipio_id' => 'required',
        ]);

        $data = $request->all();
        Proveedores::find($proveedor)->update($data);
        return redirect()->route('proveedores.index')->with('successMessage', 'Proveedor actualizado correctamente');
    }

    // app/Http/Controllers/ProveedorController.php
    public function toggleEstatus($id)
    {
        $proveedor = Proveedores::findOrFail($id);

        $proveedor->estatus = $proveedor->estatus === 'activo' ? 'inactivo' : 'activo';
        $proveedor->save();

        return redirect()->route('proveedores.index')->with('successMessage', 'Estatus del proveedor actualizado correctamente.');
    }

}
