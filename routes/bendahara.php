<?php

use App\Http\Controllers\InputPembayaranSekolahController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InputUangSakuController;
use App\Http\Controllers\InputPengeluaranSiswaController;


Route::middleware([
    'auth',
    'role:Admin|Bendahara|Guru|Karyawan|Kepala Sekolah|Kesiswaan|Kurikulum|Tata Usaha'
])->group(function () {

    // Route Input Pembayaran Sekolah
    Route::controller(InputPembayaranSekolahController::class)->group(function () {
        Route::get('input-pembayaran-sekolah', 'index')->name('input-pembayaran-sekolah');
        Route::post('input-pembayaran-sekolah', 'simpan')->name('input-pembayaran-sekolah');
        Route::delete('input-pembayaran-sekolah', 'hapus')->name('input-pembayaran-sekolah');
    });

    // Route Input Pengeluaran Siswa
    Route::controller(InputPengeluaranSiswaController::class)->group(function () {
        Route::get('input-pengeluaran-siswa', 'index')->name('input-pengeluaran-siswa');
        Route::post('input-pengeluaran-siswa', 'simpan')->name('input-pengeluaran-siswa.simpan');
        Route::delete('input-pengeluaran-siswa', 'hapus')->name('input-pengeluaran-siswa.hapus');
    });

    // Route Input Uang Saku
    Route::controller(InputUangSakuController::class)->group(function () {
        Route::get('input-uang-saku', 'index')->name('input-uang-saku');
        Route::post('input-uang-saku', 'simpan')->name('input-uang-saku.simpan');
        Route::delete('input-uang-saku', 'hapus')->name('input-uang-saku.hapus');
    });
});
