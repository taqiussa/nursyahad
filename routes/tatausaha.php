<?php

use App\Http\Controllers\AturKelasSiswaController;
use App\Http\Controllers\AturSiswaKeluarController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataKelasController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\DataSiswaKeluarController;
use App\Http\Controllers\TambahKelasController;
use App\Http\Controllers\TambahSiswaController;


Route::middleware([
    'auth',
    'role:Admin|Bendahara|Guru|Karyawan|Kepala Sekolah|Kesiswaan|Kurikulum|Tata Usaha'
])->group(function () {

    // Route Atur Kelas Siswa
    Route::controller(AturKelasSiswaController::class)->group(function () {
        Route::get('atur-kelas-siswa', 'index')->name('atur-kelas-siswa');
        Route::post('atur-kelas-siswa', 'simpan')->name('atur-kelas-siswa.simpan');
    });

    // Route Atur Siswa Keluar
    Route::controller(AturSiswaKeluarController::class)->group(function () {
        Route::get('atur-siswa-keluar', 'index')->name('atur-siswa-keluar');
        Route::delete('atur-siswa-keluar', 'hapus')->name('atur-siswa-keluar.hapus');
    });

    // Route Data Kelas
    Route::controller(DataKelasController::class)->group(function () {
        Route::get('data-kelas', 'index')->name('data-kelas');
        Route::delete('data-kelas', 'hapus')->name('data-kelas.hapus');
    });

    // Route Data Siswa
    Route::get('data-siswa', DataSiswaController::class)->name('data-siswa');

    // Route Data Siswa Keluar
    Route::get('data-siswa-keluar', DataSiswaKeluarController::class)->name('data-siswa-keluar');

    // Route Tambah Kelas
    Route::controller(TambahKelasController::class)->group(function () {
        Route::get('tambah-kelas', 'index')->name('tambah-kelas');
        Route::post('tambah-kelas', 'simpan')->name('tambah-kelas.simpan');
    });

    // Route Tambah Siswa
    Route::controller(TambahSiswaController::class)->group(function () {
        Route::get('tambah-siswa', 'index')->name('tambah-siswa');
        Route::post('tambah-siswa', 'simpan')->name('tambah-siswa.simpan');
        Route::delete('tambah-siswa', 'hapus')->name('tambah-siswa.hapus');

        // Route Edit Siswa
        Route::get('tambah-siswa/edit', 'edit')->name('tambah-siswa.edit');
        Route::post('tambah-siswa/update', 'update')->name('tambah-siswa.update');
    });
});
