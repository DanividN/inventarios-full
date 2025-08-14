<?php

namespace App\Models\funciones;

use App\Models\configuracion\areas;
use Illuminate\Database\Eloquent\Model;

class EntregasConsumo extends Model
{
    protected $table = 'entregas_consumos';

    protected $fillable = [
        'folio',
        'area_id',
        'enlace',
        'entregado_por',
        'descripcion',
    ];

    public function area()
    {
        return $this->belongsTo(areas::class, 'area_id');
    }

    public function DetalleEntregaConsumo()
    {
        return $this->hasMany(DetalleEntregasConsumo::class, 'entrega_consumo_id');
    }
}
