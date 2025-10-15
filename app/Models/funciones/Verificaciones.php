<?php

namespace App\Models\funciones;

use App\Models\configuracion\areas;
use App\Models\configuracion\Trabajadores;
use Illuminate\Database\Eloquent\Model;

class Verificaciones extends Model
{
    protected $table = 'verificaciones';
    protected $fillable = [
        'area_id',
        'verificador_id',
        'fecha_agendada',
        'hora_agendada',
        'direccion',
        'periodo',
        'resguardatarios_id',
    ];

    public function area()
    {
        return $this->belongsTo(areas::class);
    }

    public function resguardatarios()
    {
        return $this->belongsTo(Trabajadores::class, 'resguardatarios_id');
    }

    public function verificador()
    {
        return $this->belongsTo(Trabajadores::class);
    }
}
