<?php

namespace App\Models\funciones;

use App\Models\configuracion\areas;
use Illuminate\Database\Eloquent\Model;

class EntregasInventariables extends Model
{
    protected $table = 'entregas_inventariables';

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

    public function DetalleEntregaInventariable()
        {
            return $this->hasMany(DetalleEntregaInventariable::class, 'entrega_inventariable_id');
        }

}
