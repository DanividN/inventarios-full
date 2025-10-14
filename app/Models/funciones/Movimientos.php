<?php

namespace App\Models\funciones;

use Illuminate\Database\Eloquent\Model;

class Movimientos extends Model
{
    protected $table = 'movimientos';

    protected $fillable = [
        'resguardo_id',
        'trabajador_antiguo',
        'motivo',
        'descripcion',
    ];
}
