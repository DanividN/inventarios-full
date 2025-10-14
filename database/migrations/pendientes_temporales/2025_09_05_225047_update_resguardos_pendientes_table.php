<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resguardos_pendientes', function (Blueprint $table) {
            // crear nueva columna con relación
            $table->foreignId('bienes_inventariable_id')
                ->nullable() // <-- opcional, ponlo si no quieres que truene si no hay datos
                ->constrained('bienes_inventariables')
                ->cascadeOnDelete()
                ->after('trabajador_id'); // <-- ponlo en la posición que quieras
        });
    }

    public function down(): void
    {
        Schema::table('resguardos_pendientes', function (Blueprint $table) {
            $table->dropForeign(['bienes_inventariable_id']);
            $table->dropColumn('bienes_inventariable_id');
        });
    }
};
