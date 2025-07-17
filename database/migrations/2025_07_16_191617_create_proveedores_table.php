<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno');
            $table->string('rfc');
            $table->string('razon_social')->nullable();
            $table->string('nombre_comercial')->nullable();
            $table->string('telefono');
            $table->string('calle');
            $table->string('numero_exterior');
            $table->string('numero_interior')->nullable();
            $table->string('colonia');
            $table->string('codigo_postal');
            $table->foreignId('municipio_id')->constrained('municipios')->cascadeOnDelete();
            $table->string('pagina_web');
            $table->string('descripcion');
            $table->enum('tipo', ['fisica', 'moral']);
            $table->enum('estatus', ['activo', 'inactivo']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
