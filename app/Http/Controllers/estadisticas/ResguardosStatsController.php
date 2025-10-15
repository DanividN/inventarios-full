<?php

namespace App\Http\Controllers\estadisticas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResguardosStatsController extends Controller
{
    public function resguardos(){
        return Inertia::render('estadisticas/resguardos');
    }
}
