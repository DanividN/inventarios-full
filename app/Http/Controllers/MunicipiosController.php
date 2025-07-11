<?php

namespace App\Http\Controllers;

use App\Models\Estados;
use Illuminate\Http\Request;

class MunicipiosController extends Controller
{
    public function getMunicipios($estado)
    {
        $estado = Estados::with('municipios')->findOrFail($estado);
        return response()->json($estado->municipios);
    }
}
