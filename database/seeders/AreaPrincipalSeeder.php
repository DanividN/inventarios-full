<?php

namespace Database\Seeders;

use App\Models\configuracion\areas;
use App\Models\Municipios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaPrincipalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //area generica para la tabla areas
        areas::create([
            'name' => 'Dirección General',
            'nomenclatura' => 'DG',
            'telefono' => 123456789,
            'calle' => 'Calle Principal',
            'numero_exterior' => '123',
            'numero_interior' => null,
            'colonia' => 'Colonia Principal',
            'codigo_postal' => '12345',
            'municipio_id' => 1,
            'area_padre_id' => null
        ]);
    }
}
