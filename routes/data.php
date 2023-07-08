<?php

use App\Http\Controllers\GetDataBendaharaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetDataSiswaController;
use App\Http\Controllers\GetDataWilayahController;
use App\Http\Controllers\GetDataUangSakuController;
use App\Http\Controllers\GetDataPengeluaranSiswaController;

Route::middleware(['auth'])->group(function () {

    // Route Get Data Bendahara
    Route::controller(GetDataBendaharaController::class)->group(function () {
        Route::post('get-gunabayar', 'get_gunabayar')->name('get-gunabayar');
        Route::post('get-wajib-bayar-sekolah', 'get_wajib_bayar_sekolah')->name('get-wajib-bayar-sekolah');
    });

    // Route Get Data Siswa 
    Route::controller(GetDataSiswaController::class)->group(function () {
        Route::post('get-all-siswa', 'get_all_siswa')->name('get-all-siswa');
    });

    // Route Get Data Pengeluaran Siswa
    Route::controller(GetDataPengeluaranSiswaController::class)->group(function () {
        Route::post('get-pengeluaran-siswa', 'get_pengeluaran_siswa')->name('get-pengeluaran-siswa');
    });

    // Route Get Data Uang Saku
    Route::controller(GetDataUangSakuController::class)->group(function () {
        Route::post('get-uang-saku', 'get_uang_saku')->name('get-uang-saku');
    });

    // Route Get Data Wilayah
    Route::controller(GetDataWilayahController::class)->group(function () {
        Route::post('get-desa', 'desa')->name('get-desa');
        Route::post('get-kabupaten', 'kabupaten')->name('get-kabupaten');
        Route::post('get-kecamatan', 'kecamatan')->name('get-kecamatan');
    });
});
