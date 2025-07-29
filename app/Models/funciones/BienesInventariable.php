<?php

namespace App\Models\funciones;

use App\Models\configuracion\areas;
use App\Models\configuracion\Clasificacion;
use App\Models\configuracion\Proveedores;
use Illuminate\Database\Eloquent\Model;

class BienesInventariable extends Model
{
    protected $table = 'bienes_inventariables';

    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'codigo',
        'marca',
        'modelo',
        'serie',
        'numero_motor',
        'numero_factura',
        'fecha_ingreso',
        'numero_inventario',
        'depreciacion',
        'area_id',
        'clasificacion_id',
        'proveedor_id',
        'costo_unitario',
        'numero_economica',
        'placas',
        'tipo_poliza',
        'numero_poliza',
        'estado',
        'grupo_activo',
        'alta',
        'tipo',
        'imagenes'
    ];

    public function area()
    {
        return $this->belongsTo(areas::class, 'area_id');
    }

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class, 'clasificacion_id');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedores::class, 'proveedor_id');
    }


}
