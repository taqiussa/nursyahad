<?php

use App\Http\Controllers\BuatRoleController;
use App\Http\Controllers\DataKelasController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\GetDataSiswaController;
use App\Http\Controllers\GetDataWilayahController;
use App\Http\Controllers\InputPengeluaranSiswaController;
use App\Http\Controllers\InputUangSakuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TambahKelasController;
use App\Http\Controllers\TambahSiswaController;
use App\Http\Controllers\UploadSiswaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return inertia('Auth/Login');
});

Route::middleware(['auth'])->group(function () {

    // Route Get Data Siswa 
    Route::controller(GetDataSiswaController::class)->group(function () {
        Route::post('get-all-siswa', 'get_all_siswa')->name('get-all-siswa');
    });

    // Route Get Data Wilayah
    Route::controller(GetDataWilayahController::class)->group(function () {
        Route::post('get-desa', 'desa')->name('get-desa');
        Route::post('get-kabupaten', 'kabupaten')->name('get-kabupaten');
        Route::post('get-kecamatan', 'kecamatan')->name('get-kecamatan');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

Route::middleware([
    'auth',
    'role:Admin|Bendahara|Guru|Karyawan|Kepala Sekolah|Kesiswaan|Kurikulum|Tata Usaha'
])->group(function () {

    // Route Data Kelas
    Route::controller(DataKelasController::class)->group(function () {
        Route::get('data-kelas', 'index')->name('data-kelas');
        Route::delete('data-kelas', 'hapus')->name('data-kelas.hapus');
    });

    // Route Data Siswa
    Route::get('data-siswa', DataSiswaController::class)->name('data-siswa');

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

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
