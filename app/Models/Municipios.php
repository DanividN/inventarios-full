<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Municipios extends Model
{
    protected $table = 'municipios';

    protected $fillable = ['estado_id', 'nombre'];

    public function estado()
    {
        return $this->belongsTo(Estados::class, 'estado_id');
    }

}
