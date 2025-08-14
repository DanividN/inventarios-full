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
        Schema::create('detalle_entregas_consumos', function (Blueprint $table) {
            $table->foreignId('entrega_consumo_id')
                ->constrained('entregas_consumos')
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->constrained('articulos')
                ->cascadeOnDelete();
            $table->string('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_entregas_consumos');
    }
};
