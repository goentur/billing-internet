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
        Schema::create('user_perusahaans', function (Blueprint $table) {
            $table->uuid('user_id')->nullable()->comment('id user');
            $table->uuid('perusahaan_id')->nullable()->comment('id perusahaan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_perusahaans');
    }
};
