<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\SiswaKeluar;

class GetDataSiswaController extends Controller
{
    public function get_all_siswa()
    {
        return response()->json([
            'listSiswa' => Siswa::whereTahun(request('tahun'))
                ->with([
                    'alamat',
                    'biodata',
                    'kelas' => fn ($q) => $q->select('id', 'nama'),
                    'user' => fn ($q) => $q->select('nis', 'name')
                ])
                ->get()
                ->sortBy(['kelas.tingkat', 'kelas.nama', 'user.name'])
                ->values()
        ]);
    }

    public function get_all_siswa_keluar()
    {
        return response()->json([
            'listSiswa' => SiswaKeluar::whereTahun(request('tahun'))
                ->with([
                    'alamat',
                    'biodata',
                    'kelas:id,nama',
                    'user:nis,name'
                ])
                ->get()
                ->sortBy(['kelas.nama', 'user.name'])
                ->values()
        ]);
    }
}
