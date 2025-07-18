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
        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clasificacion_id')->constrained('clasificacions')->cascadeOnDelete();
            $table->string('articulo');
            $table->string('unidad_medida');
            $table->enum('tipo', ['inventariable', 'consumo']);
            $table->integer('stock_minimo');
            $table->string('numero_parte');
            $table->string('descripcion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articulos');
    }
};
