<?php

use App\Http\Controllers\KehadiranSekolahController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Siswa'])->group(function () {

    Route::get('kehadiran-sekolah', KehadiranSekolahController::class)->name('kehadiran-sekolah');
});
