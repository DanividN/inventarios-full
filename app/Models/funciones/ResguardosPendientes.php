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
        'bienes_inventariable_id',
        'creg',
        'movimiento',
        'formato_resguardo',
        'resguardo_firma',
    ];

    public function trabajador()
    {
        return $this->belongsTo(Trabajadores::class, 'trabajador_id');
    }

    public function bienesInventariable()
    {
        return $this->belongsTo(BienesInventariable::class, 'bienes_inventariable_id');
    }

}
