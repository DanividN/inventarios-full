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
        Schema::create('resguardos_pendientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trabajador_id')->constrained('trabajadores')->cascadeOnDelete();
            $table->foreignId('bienes_inventariable_id')->constrained('bienes_inventariables')->cascadeOnDelete();
            $table->string('creg');
            $table->enum('movimiento', ['sin movimiento', 'transferencia', 'reasignacion', 'desasignado']);
            $table->text('formato_resguardo')->nullable();
            $table->text('resguardo_firma')->nullable();
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resguardos_pendientes');
    }
};
