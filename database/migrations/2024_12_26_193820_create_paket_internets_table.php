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
        Schema::create('paket_internets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('perusahaan_id')->nullable()->comment('id perusahaan');
            $table->string('nama')->nullable();
            $table->string('singkatan')->nullable();
            $table->bigInteger('gmt_offset')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_internets');
    }
};
