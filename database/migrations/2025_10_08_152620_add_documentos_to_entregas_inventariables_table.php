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
        Schema::table('entregas_inventariables', function (Blueprint $table) {
            $table->string('documento_entrega')->nullable()->after('descripcion');
            $table->string('documento_firmado')->nullable()->after('documento_entrega');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entregas_inventariables', function (Blueprint $table) {
            $table->dropColumn(['documento_entrega', 'documento_firmado']);
        });
    }
};
