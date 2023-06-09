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
        Schema::create('wajib_bayar_sekolahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gunabayar_id');
            $table->string('tingkat', 3);
            $table->string('tahun', 30);
            $table->integer('jumlah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wajib_bayar_sekolahs');
    }
};
