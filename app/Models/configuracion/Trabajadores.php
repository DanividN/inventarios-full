<?php

namespace App\Models\configuracion;

use App\Models\funciones\ResguardosPendientes;
use Illuminate\Database\Eloquent\Model;

class  Trabajadores extends Model
{
    protected $table = 'trabajadores';

    protected $fillable = [
        'area_id',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'cargo',
        'numero_empleado',
        'telefono',
        'fecha_ingreso',
        'folio_ine',
        'foto_ine',
    ];

    public function area()
    {
        return $this->belongsTo(Areas::class, 'area_id');
    }

    public function resguardosPendientes()
    {
        return $this->hasMany(ResguardosPendientes::class, 'trabajador_id');
    }

    static function resguardosAsignados($id)
    {
        return ResguardosPendientes::where('trabajador_id', $id)
            ->with('trabajador.area')
            ->with('bienesInventariable')
            ->whereNotNull('resguardo_firma')
            ->get();
    }
}
