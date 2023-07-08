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
        Schema::create('pembayaran_sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('tahun', 30);
            $table->date('tanggal');
            $table->string('nis',50);
            $table->foreignId('kelas_id');
            $table->string('tingkat',3)->nullable();
            $table->foreignId('gunabayar_id');
            $table->integer('jumlah');
            $table->foreignId('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_sekolahs');
    }
};
