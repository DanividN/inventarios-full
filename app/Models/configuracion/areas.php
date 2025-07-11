<?php

namespace App\Models\configuracion;

use App\Models\Municipios;
use Illuminate\Database\Eloquent\Model;

class areas extends Model
{
    protected $table = 'areas';

    protected $fillable = [
        'name',
        'nomenclatura',
        'telefono',
        'calle',
        'numero_exterior',
        'numero_interior',
        'colonia',
        'codigo_postal',
        'municipio_id',
        'area_padre_id'
    ];

    public function areaPadre()
    {
        return $this->belongsTo(areas::class, 'area_padre_id');
    }

    public function municipio()
    {
        return $this->belongsTo(Municipios::class, 'municipio_id');
    }

}
