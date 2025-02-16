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
        Schema::create('pelanggans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('odp_id')->nullable()->comment('id odp');
            $table->uuid('perusahaan_id')->nullable()->comment('id perusahaan');
            $table->uuid('paket_internet_id')->nullable()->comment('id paket internet');
            $table->string('nama')->nullable();
            $table->tinyInteger('tanggal_bayar')->nullable();
            $table->string('telp')->nullable();
            $table->text('alamat')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggans');
    }
};
