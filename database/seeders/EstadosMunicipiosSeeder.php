<?php

namespace Database\Seeders;

use App\Models\Estados;
use App\Models\Municipios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class EstadosMunicipiosSeeder extends Seeder
{
   public function run()
    {
        $data = json_decode(
            File::get(database_path('data/estados-municipios.json')),
            true // 👈 como array asociativo
        );

        foreach ($data as $nombreEstado => $municipios) {
            $estado = Estados::create([
                'nombre' => $nombreEstado,
                'clave'  => null, // 👈 o puedes generar una clave si quieres
            ]);

            foreach ($municipios as $municipioNombre) {
                Municipios::create([
                    'estado_id' => $estado->id,
                    'nombre'    => $municipioNombre,
                ]);
            }
        }
    }
}
