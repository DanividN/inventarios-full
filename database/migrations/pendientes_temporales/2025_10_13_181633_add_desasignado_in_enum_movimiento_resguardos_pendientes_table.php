<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE resguardos_pendientes MODIFY movimiento ENUM('sin movimiento', 'transferencia', 'reasignacion', 'desasignado') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE resguardos_pendientes MODIFY movimiento ENUM('sin movimiento', 'transferencia', 'reasignacion') NOT NULL");
    }
};
