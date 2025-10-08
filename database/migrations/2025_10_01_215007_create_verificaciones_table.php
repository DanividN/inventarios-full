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
        Schema::create('verificaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('area_id')->constrained('areas')->onDelete('cascade');
            $table->foreignId('verificador_id')->constrained('trabajadores')->onDelete('cascade');
            $table->date('fecha_agendada');
            $table->time('hora_agendada');
            $table->string('direccion');
            $table->string('periodo');
            $table->foreignId('resguardatarios_id')->constrained('trabajadores')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verificaciones');
    }
};
