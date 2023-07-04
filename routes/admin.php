<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BuatRoleController;
use App\Http\Controllers\UploadSiswaController;

Route::middleware([
    'auth',
    'role:Admin'
])->group(function () {

    // Route Buat Role
    Route::controller(BuatRoleController::class)->group(function () {
        Route::get('buat-role', 'index')->name('buat-role');
        Route::post('buat-role', 'simpan')->name('buat-role.simpan');
        Route::delete('buat-role', 'hapus')->name('buat-role.hapus');
    });

    // Route Upload Siswa
    Route::controller(UploadSiswaController::class)->group(function () {
        Route::get('upload-siswa', 'index')->name('upload-siswa');
        Route::post('upload-siswa', 'upload')->name('upload-siswa.upload');
    });
});