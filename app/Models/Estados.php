<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estados extends Model
{
    protected $table = 'estados';

    protected $fillable = ['nombre', 'clave'];

    public function municipios()
    {
        return $this->hasMany(Municipios::class, 'estado_id');
    }


}
