<?php

namespace App\Http\Controllers;

use App\Models\Kelas;

class TambahKelasController extends Controller
{
    public function index()
    {
        return inertia('TataUsaha/TambahKelas');
    }

    public function simpan()
    {
        request()->validate(
            [
                'nama' => 'required',
                'tingkat' => 'required',
            ],
            [
                'nama.required' => 'Silahkan di Isi',
                'tingkat.required' => 'Silahkan di Pilih',
            ]
        );

        Kelas::create([
            'nama' => request('nama'),
            'tingkat' => request('tingkat'),
        ]);

        return to_route('tambah-kelas');
    }
}
