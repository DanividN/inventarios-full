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
        Schema::create('bienes_inventariables', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', ['asignado', 'almacen']);
            $table->foreignId('clasificacion_id')->constrained('clasificacions')->cascadeOnDelete();
            $table->enum('alta', ['compra', 'donacion', 'transferencia', 'comodato', ]);
            $table->enum('grupo_activo', ['patrimonial', 'mercantil']);
            // area puede venir o no en el registro
            $table->foreignId('area_id')->nullable()->constrained('areas')->cascadeOnDelete();
            $table->date('fecha_ingreso');
            $table->string('numero_inventario');
            $table->string('depreciacion');
            $table->string('nombre');
            $table->string('marca');
            $table->string('modelo');
            $table->string('serie');
            $table->string('numero_motor')->nullable();
            $table->string('numero_factura')->nullable();
            $table->foreignId('proveedor_id')->constrained('proveedores')->cascadeOnDelete();
            $table->enum('estado', ['nuevo', 'reacondicionado', 'usado']);
            $table->string('costo_unitario');
            $table->string('numero_economico')->nullable();
            $table->string('placas')->nullable();
            $table->string('tipo_poliza')->nullable();
            $table->string('numero_poliza')->nullable();
            $table->text('descripcion');
            $table->text('imagenes');
            $table->enum('estatus', ['activo', 'inactivo']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bienes_inventariables');
    }
};
