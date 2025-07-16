<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Trabajadores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TrabajadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $trabajadores = Trabajadores::with('area')->get();

        return Inertia::render('configuracion/trabajadores/index', [
            'trabajadores' => $trabajadores
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = areas::all();
        return Inertia::render('configuracion/trabajadores/create', [
            'areas' => $areas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'area_id' => 'required',
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'telefono' => 'required',
            'cargo' => 'required',
            'numero_empleado' => 'required',
            'fecha_ingreso' => 'required',
            'folio_ine' => 'required',
            'foto_ine' => 'required|array',
            'foto_ine.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $paths = [];

        if ($request->hasFile('foto_ine')) {
            foreach ($request->file('foto_ine') as $file) {
                $paths[] = $file->store('trabajadores/ine_fotos', 'private');
            }
        }

        $data = $request->all();
        $data['foto_ine'] = json_encode($paths); // Guarda el array como JSON en la DB

        Trabajadores::create($data);

        return redirect()->route('trabajadores.index')->with('successMessage', 'Trabajador creado correctamente');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $trabajador)
    {
        $trabajador = Trabajadores::with('area')->findOrFail($trabajador);
        $areas = areas::all();
        return Inertia::render('configuracion/trabajadores/edit', [
            'trabajador' => $trabajador,
            'areas' => $areas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trabajadores $trabajador)
    {
    
        $request->validate([
            'area_id' => 'required',
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'telefono' => 'required',
            'cargo' => 'required',
            'numero_empleado' => 'required',
            'fecha_ingreso' => 'required',
            'folio_ine' => 'required',
            'foto_ine.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $data = $request->all();

        // Si el usuario subió nuevas imágenes, reemplaza las existentes
        if ($request->hasFile('foto_ine')) {
            $paths = [];
            foreach ($request->file('foto_ine') as $file) {
                $paths[] = $file->store('trabajadores/ine_fotos', 'private');
            }
            $data['foto_ine'] = json_encode($paths);
        } else {
            // Si no subió nuevas, conserva las anteriores
            unset($data['foto_ine']);
        }

        $trabajador->update($data);

        return redirect()->route('trabajadores.index')->with('successMessage', 'Trabajador actualizado correctamente');
    }

    public function verFotoIne($filename)
    {
        $path = 'trabajadores/ine_fotos/' . $filename;

        if (!Storage::disk('private')->exists($path)) {
            abort(404, 'Archivo no encontrado');
        }

        return response()->file(Storage::disk('private')->path($path));
    }
}
