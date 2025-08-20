<?php

namespace App\Models\funciones;

use App\Models\configuracion\Articulos;
use App\Models\configuracion\Trabajadores;
use Illuminate\Database\Eloquent\Model;

class ResguardosPendientes extends Model
{
    protected $table = 'resguardos_pendientes';

    protected $fillable = [
        'trabajador_id',
        'articulo_id',
        'creg',
        'movimiento',
        'formato_resguardo',
        'resguardo_firma',
    ];

    public function trabajador()
    {
        return $this->belongsTo(Trabajadores::class, 'trabajador_id');
    }

    public function articulo()
    {
        return $this->belongsTo(Articulos::class, 'articulo_id');
    }
}
