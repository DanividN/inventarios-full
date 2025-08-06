<?php

namespace App\Models\funciones;

use Illuminate\Database\Eloquent\Model;

class DetalleEntregaInventariable extends Model
{
    protected $table = 'detalle_entrega_inventariables';
    protected $fillable = [
        'entrega_inventariable_id',
        'bienes_inventariable_id',
    ];

    public function bienesInventariable()
    {
        return $this->belongsTo(BienesInventariable::class, 'bienes_inventariable_id');
    }

    public function entregaInventariable()
    {
        return $this->belongsTo(EntregasInventariables::class, 'entrega_inventariable_id');
    }
}
