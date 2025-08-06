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
        Schema::create('detalle_entrega_inventariables', function (Blueprint $table) {
            $table->foreignId('entrega_inventariable_id')
                ->constrained('entregas_inventariables')
                ->onDelete('cascade');
            $table->foreignId('bienes_inventariable_id')
                ->constrained('bienes_inventariables')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_entrega_inventariables');
    }
};
