<?php

namespace Database\Seeders;

use App\Models\configuracion\Articulos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticulosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Articulos::create([
            'id' => 1,
            'clasificacion_id' => 1,
            'articulo' => 'Cemento Cemex 20kg',
            'unidad_medida' => 'Pieza',
            'tipo' => 'consumo',
            'stock_minimo' => 10,
            'numero_parte' => 'CEMEX-20KG',
            'descripcion' => 'Cemento Cemex de 20kg, ideal para construccion y reparaciones',
        ]);
    }
}
