<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\configuracion\Proveedores;
use App\Models\funciones\BienesInventariable;
use App\Models\funciones\ResguardosPendientes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BienesInventariablesController extends Controller
{
    public function index(): Response
    {
        // con areas
        $bienes = BienesInventariable::with('clasificacion', 'area', 'proveedor')->get();
        return Inertia::render('funciones/bienesInventariables/index', [
            'bienes' => $bienes
        ]);
    }

    public function create()
    {
        $proveedores = Proveedores::all();
        $clasificaciones = Clasificacion::all();
        $areas = areas::all();
        return Inertia::render('funciones/bienesInventariables/create', [
            'proveedores' => $proveedores,
            'clasificaciones' => $clasificaciones,
            'areas' => $areas
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'tipo' => 'required',
            'clasificacion_id' => 'required',
            'fecha_ingreso' => 'required',
            'numero_inventario' => 'required',
            'depreciacion' => 'required',
            'nombre' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'serie' => 'required',
            'proveedor_id' => 'required',
            'costo_unitario' => 'required',
            'imagenes' => 'required|array',
            'imagenes.*' => 'file|mimes:jpg,jpeg,png,gif', // Validación de imágenes
        ]);

        $paths = [];

        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $file) {
                $paths[] = $file->store('bienes_inventariables/imagenes', 'private');
            }
        }

        $data = $request->all();
        $data['imagenes'] = json_encode($paths);

        BienesInventariable::create($data);
        return redirect()->route('inventariables.index');
    }

    public function edit(string $bienes_inventariable)
    {
        $bienes = BienesInventariable::with('clasificacion', 'area', 'proveedor')->find($bienes_inventariable);
        $proveedores = Proveedores::all();
        $clasificaciones = Clasificacion::all();
        $areas = areas::all();
        $historial_resguardos = ResguardosPendientes::where('bienes_inventariable_id', $bienes_inventariable)->with('trabajador')->orderBy('created_at', 'desc')->get();
        return Inertia::render('funciones/bienesInventariables/edit', [
            'bienes' => $bienes,
            'proveedores' => $proveedores,
            'clasificaciones' => $clasificaciones,
            'areas' => $areas,
            'historial_resguardos' => $historial_resguardos
        ]);
    }

    public function update(Request $request, BienesInventariable $bienes_inventariable)
    {
        $request->validate([
            'tipo' => 'required',
            'clasificacion_id' => 'required',
            'fecha_ingreso' => 'required',
            'numero_inventario' => 'required',
            'depreciacion' => 'required',
            'nombre' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'serie' => 'required',
            'proveedor_id' => 'required',
            'costo_unitario' => 'required',
        ]);

        $data = $request->all();

        if ($request->hasFile('imagenes')) {
            $paths = [];
            foreach ($request->file('imagenes') as $file) {
                $paths[] = $file->store('bienes_inventariables/imagenes', 'private');
            }
            $data['imagenes'] = json_encode($paths);
        } else {
            unset($data['imagenes']);
        }

        $bienes_inventariable->update($data);

        return redirect()->route('inventariables.index');
    }

    public function verImagenes($filename)
    {
        $path = 'bienes_inventariables/imagenes/' . $filename;

        if (!Storage::disk('private')->exists($path)) {
            abort(404, 'Archivo no encontrado');
        }
        return response()->file(Storage::disk('private')->path($path));
    }

    public function baja(BienesInventariable $bienes_inventariable)
    {
        // Cambia el estatus a inactivo;
        $bienes_inventariable->estatus = "inactivo";
        $bienes_inventariable->save();

        return redirect()->route('inventariables.index');
    }


    public function getArticulo($articulo)
    {
        $bienes = BienesInventariable::with('clasificacion')->where('clasificacion_id', $articulo)->where('tipo', 'almacen')->get();
        return response()->json($bienes);
    }

    public function getArticulosArea($area)
    {
        $bienes = BienesInventariable::where('area_id', $area)
            ->where('tipo', 'asignado')
            ->where(function ($query) {
                $query->doesntHave('resguardosPendientes') // sin ningún resguardo
                    ->orWhere(function ($q) {
                        $q->whereHas('resguardosPendientes', function ($resguardo) {
                            $resguardo->where('estatus', '!=', 'activo')
                                ->where('movimiento', 'desasignado');
                        })
                            ->whereDoesntHave('resguardosPendientes', function ($resguardoActivo) {
                                $resguardoActivo->where('estatus', 'activo'); // 👈 asegura que no haya ninguno activo
                            });
                    });
            })
            ->get();

        return response()->json($bienes);
    }
}
