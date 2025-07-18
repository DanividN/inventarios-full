<?php

namespace Database\Seeders;

use App\Models\configuracion\Proveedores;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProveedoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Proveedores::create([
            'nombre' => 'Carlos',
            'apellido_paterno' => 'Cruz',
            'apellido_materno' => 'Lopez',
            'rfc' => '1234567890',
            'telefono' => '1234567890',
            'calle' => 'Calle Principal',
            'numero_exterior' => '123',
            'numero_interior' => '456',
            'colonia' => 'Colonia Principal',
            'codigo_postal' => '12345',
            'municipio_id' => 50,
            'pagina_web' => 'www.ejemplo.com',
            'descripcion' => 'Proveedor de ejemplo',
            'tipo' => 'fisica',
            'estatus' => 'activo'
        ]);
    }
}
