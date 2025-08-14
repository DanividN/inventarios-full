<?php

namespace App\Models\funciones;

use Illuminate\Database\Eloquent\Model;

class ResguardosPendientes extends Model
{
    protected $table = 'resguardos_pendientes';

    protected $fillable = [
        'trabajador_id',
        'articulo_id',
        'movimiento',
        'formato_resguardo',
        'resguardo_firma',
    ];
}
