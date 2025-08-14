<?php

namespace App\Models\funciones;

use App\Models\configuracion\Articulos;
use Illuminate\Database\Eloquent\Model;

class DetalleEntregasConsumo extends Model
{
    protected $table = 'detalle_entregas_consumos';
    protected $fillable= [
        'entrega_consumo_id',
        'articulo_id',
        'cantidad'
    ];

    public function articulo()
    {
        return $this->belongsTo(Articulos::class, 'articulo_id');
    }

    public function entregaConsumo()
    {
        return $this->belongsTo(EntregasConsumo::class, 'entrega_consumo_id');
    }
}
