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
    Schema::create('areas', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('nomenclatura');
        $table->string('telefono');
        $table->string('calle');
        $table->string('numero_exterior');
        $table->string('numero_interior')->nullable();
        $table->string('colonia');
        $table->string('codigo_postal');
        $table->foreignId('municipio_id')->constrained('municipios')->cascadeOnDelete();
        $table->foreignId('area_padre_id')->nullable();
        $table->timestamps();
    });

        Schema::table('areas', function (Blueprint $table) {
            $table->foreign('area_padre_id')->references('id')->on('areas')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};
