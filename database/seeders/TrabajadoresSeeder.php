<?php

namespace Database\Seeders;

use App\Models\configuracion\Trabajadores;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrabajadoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trabajadores::create([
            'area_id' => 1,
            'nombre' => 'Juan',
            'apellido_paterno' => 'Perez',
            'apellido_materno' => 'Lopez',
            'cargo' => 'Administrador',
            'numero_empleado' => '12345',
            'telefono' => '1234567890',
            'fecha_ingreso' => '2022-01-01',
            'folio_ine' => '1234567890',
            'foto_ine' => json_encode(['imagen1.jpg', 'imagen2.jpg'])
        ]);
    }
}
