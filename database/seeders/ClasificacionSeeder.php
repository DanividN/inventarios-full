<?php

namespace Database\Seeders;

use App\Models\configuracion\Clasificacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClasificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Clasificacion::create([
                'clave' => '1000',
                'clasificacion' => 'Materiales de Construcción',
                'descripcion' => 'Materiales de Construcción'
        ]);
    }
}
