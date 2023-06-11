<?php

namespace App\Http\Controllers;

use App\Models\Siswa;

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
        ]);
    }
}
