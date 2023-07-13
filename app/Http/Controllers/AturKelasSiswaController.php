<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\User;
use App\Traits\InitTrait;

class AturKelasSiswaController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Guru/AturKelasSiswa', [
            'initTahun' => $this->data_tahun(),
            'listKelas' => Kelas::orderBy('kategori_kelas_id')
                ->orderBy('nama')
                ->get(),
            'listSiswa' => User::role('Siswa')
                ->whereDoesntHave('siswa')
                ->orderBy('name')
                ->get()
        ]);
    }

    public function simpan()
    {
        $validated = request()->validate([
            'nis' => 'required',
            'tahun' => 'required',
            'kelas_id' => 'required'
        ]);

        $validated['tingkat'] = Kelas::find(request('kelas_id'))->tingkat;

        Siswa::create($validated);

        return to_route('atur-kelas-siswa');
    }
}
