<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Model;

class Articulos extends Model
{
    protected $table = 'articulos';

    protected $fillable = [
        'clasificacion_id',
        'articulo',
        'unidad_medida',
        'tipo',
        'stock_minimo',
        'numero_parte',
        'descripcion',
    ];

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class , 'clasificacion_id');
    }
}
