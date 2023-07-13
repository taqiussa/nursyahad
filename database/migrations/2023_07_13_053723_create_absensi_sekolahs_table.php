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
        Schema::create('absensi_sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('tahun', 30);
            $table->string('semester', 2);
            $table->date('tanggal');
            $table->string('jam', 3);
            $table->string('nis', 50);
            $table->foreignId('kelas_id');
            $table->foreignId('kehadiran_id');
            $table->foreignId('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi_sekolahs');
    }
};
