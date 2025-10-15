<?php

namespace App\Models\configuracion;

use App\Models\funciones\ResguardosPendientes;
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

    public function trabajadores()
    {
        return $this->hasMany(Trabajadores::class, 'area_id');
    }

    public function resguardosFirmados()
    {
        return $this->hasManyThrough(ResguardosPendientes::class, Trabajadores::class, 'area_id', 'trabajador_id')
            ->whereNotNull('resguardo_firma');
    }

    public function scopeWithResguardoStats($query)
    {
        return $query->withCount([
            // Cantidad de trabajadores que tienen al menos un resguardo firmado
            'trabajadores as trabajadores_con_resguardo' => function ($q) {
                $q->whereHas('resguardosPendientes', function ($resguardo) {
                    $resguardo->whereNotNull('resguardo_firma')
                        ->where('estatus', '!=', 'inactivo'); // 👈 excluye los inactivos

                });
            },
            // Total de resguardos firmados en el área
            'resguardosFirmados as total_resguardos_firmados_area' => function ($q) {
                $q->where('estatus', '!=', 'inactivo'); // 👈 excluye también aquí
            },
        ]);
    }

    public static function detalleConResguardatarios($id)
    {
        return Trabajadores::where('area_id', $id)
            ->whereHas('resguardosPendientes', function ($q) {
                $q->whereNotNull('resguardo_firma');
            })
            ->with([
                'resguardosPendientes' => function ($q) {
                    $q->whereNotNull('resguardo_firma');
                }
            ])
            ->withCount([
                'resguardosPendientes as total_resguardos' => function ($q) {
                    $q->whereNotNull('resguardo_firma');
                    $q->where('estatus', '!=', 'inactivo');
                }
            ])
            ->get();
    }
}
