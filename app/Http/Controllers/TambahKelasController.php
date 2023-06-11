<?php

namespace App\Http\Controllers;

use App\Models\KategoriKelas;
use App\Models\Kelas;

class TambahKelasController extends Controller
{
    public function index()
    {
        return inertia('TataUsaha/TambahKelas', ['listKategori' => KategoriKelas::orderBy('nama')->get()]);
    }

    public function simpan()
    {
        request()->validate(
            [
                'nama' => 'required',
                'tingkat' => 'required',
                'kategoriKelasId' => 'required',
            ],
            [
                'nama.required' => 'Silahkan di Isi',
                'tingkat.required' => 'Silahkan di Pilih',
                'kategoriKelasId.required' => 'Silahkan di Pilih',
            ]
        );

        Kelas::create([
            'nama' => request('nama'),
            'tingkat' => request('tingkat'),
            'kategori_kelas_id' => request('kategoriKelasId')
        ]);

        return to_route('tambah-kelas');
    }
}
