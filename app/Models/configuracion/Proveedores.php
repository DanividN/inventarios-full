<?php

namespace App\Models\configuracion;

use App\Models\Municipios;
use Illuminate\Database\Eloquent\Model;

class Proveedores extends Model
{
    protected $table = 'proveedores';

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'rfc',
        'razon_social',
        'nombre_comercial',
        'telefono',
        'calle',
        'numero_exterior',
        'numero_interior',
        'colonia',
        'codigo_postal',
        'municipio_id',
        'pagina_web',
        'descripcion',
        'tipo',
        'estatus',
    ];

    public function municipio()
    {
        return $this->belongsTo(Municipios::class, 'municipio_id');
    }
}
