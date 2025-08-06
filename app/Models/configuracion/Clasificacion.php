<?php

namespace App\Models\configuracion;

use Illuminate\Database\Eloquent\Model;

class Clasificacion extends Model
{
    protected $table = 'clasificacions';

    protected $fillable = [
        'clave',
        'clasificacion',
        'descripcion',
    ];

     public function articulos()
    {
        return $this->hasMany(Articulos::class, 'clasificacion_id');
    }

}
