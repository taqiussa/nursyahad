<?php

namespace App\Http\Controllers;

use App\Models\Kelas;

class DataKelasController extends Controller
{
    public function index()
    {
        return inertia('TataUsaha/DataKelas', ['listKelas' => Kelas::with('kategori')->orderBy('nama')->get()]);
    }
}
