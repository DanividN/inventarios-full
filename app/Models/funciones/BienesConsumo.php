<?php

namespace App\Models\funciones;

use App\Models\configuracion\Articulos;
use App\Models\configuracion\Clasificacion;
use App\Models\configuracion\Proveedores;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class BienesConsumo extends Model
{
    protected $table = 'bienes_consumos';

    protected $fillable = [
        'clasificacion_id',
        'articulo_id',
        'proveedor_id',
        'recibe',
        'cantidad',
        'unidad_medida',
        'costo_unitario',
        'costo_total',
        'descripcion'
    ];

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class, 'clasificacion_id');
    }

    public function articulo()
    {
        return $this->belongsTo(Articulos::class, 'articulo_id');
    }
    public function proveedor()
    {
        return $this->belongsTo(Proveedores::class, 'proveedor_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'recibe');
    }
    static function indexTable()
    {
        return self::with(['articulo', 'clasificacion', 'proveedor'])
            ->selectRaw('clasificacion_id, articulo_id, unidad_medida, SUM(cantidad) as cantidad')
            ->groupBy('clasificacion_id', 'articulo_id', 'unidad_medida')
            ->get();
    }

}
