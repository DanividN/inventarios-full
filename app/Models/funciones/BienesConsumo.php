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
        // Obtener la suma de ingresos agrupados
        $ingresos = self::with(['articulo', 'clasificacion', 'proveedor'])
            ->selectRaw('clasificacion_id, articulo_id, unidad_medida, SUM(cantidad) as cantidad')
            ->groupBy('clasificacion_id', 'articulo_id', 'unidad_medida')
            ->get();

        // Obtener la suma de consumos por articulo_id
        $consumos = DetalleEntregasConsumo::selectRaw('articulo_id, SUM(cantidad) as cantidad')
            ->groupBy('articulo_id')
            ->pluck('cantidad', 'articulo_id'); // Pluck para acceso rápido por ID

        // Restar consumos a ingresos
        $resultado = $ingresos->map(function ($item) use ($consumos) {
            $consumo = $consumos[$item->articulo_id] ?? 0;
            $item->cantidad -= $consumo;
            return $item;
        });

        return $resultado;
    }

    static function getArticulos($clasificacion)
    {
        // Obtener ingresos agrupados por articulo dentro de la clasificación dada
        $ingresos = self::with(['articulo', 'clasificacion', 'proveedor'])
            ->selectRaw('clasificacion_id, articulo_id, unidad_medida, SUM(cantidad) as cantidad')
            ->where('clasificacion_id', $clasificacion)
            ->groupBy('clasificacion_id', 'articulo_id', 'unidad_medida')
            ->get();

        // Obtener consumos agrupados por articulo_id
        $consumos = DetalleEntregasConsumo::selectRaw('articulo_id, SUM(cantidad) as cantidad')
            ->groupBy('articulo_id')
            ->pluck('cantidad', 'articulo_id'); // clave: articulo_id, valor: suma cantidad

        // Restar consumos a los ingresos
        $resultado = $ingresos->map(function ($item) use ($consumos) {
            $consumo = $consumos[$item->articulo_id] ?? 0;
            $item->cantidad -= $consumo;
            return $item;
        });

        return $resultado;
    }
}
