<?php

use App\Http\Controllers\AbsensiSekolahController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth',
    'role:Admin|Bendahara|Guru|Karyawan|Kepala Sekolah|Kesiswaan|Kurikulum|Tata Usaha'
])->group(function () {

    // Route Absensi Sekolah
    Route::controller(AbsensiSekolahController::class)->group(function () {
        Route::get('absensi-sekolah', 'index')->name('absensi-sekolah');
        Route::post('absensi-sekolah', 'simpan')->name('absensi-sekolah.simpan');
        Route::post('absensi-sekolah/nihil', 'nihil')->name('absensi-sekolah.nihil');
    });
});
