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
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable()->comment('id user');
            $table->uuid('pelanggan_id')->nullable()->comment('id pelanggan');
            $table->uuid('paket_internet_id')->nullable()->comment('id paket internet');
            $table->bigInteger('tanggal_pembayaran')->nullable();
            $table->bigInteger('tanggal_transaksi')->nullable();
            $table->bigInteger('total')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
