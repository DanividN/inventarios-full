<?php

namespace App\Http\Controllers\funciones;

use App\Http\Controllers\Controller;
use App\Models\configuracion\areas;
use App\Models\funciones\ResguardosPendientes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResguardosPendientesController extends Controller
{
    public function index(){
        $pendientes = ResguardosPendientes::with('articulo', 'trabajador')->get();
        $areas = areas::all();
        return Inertia::render('funciones/resguardosPendientes/index', [
            'pendientes' => $pendientes,
            'areas' => $areas
        ]);
    }

    public function store(Request $request){
        ResguardosPendientes::create($request->all());
        return redirect()->back();
    }
}

