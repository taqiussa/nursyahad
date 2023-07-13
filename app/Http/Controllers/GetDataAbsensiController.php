<?php

namespace App\Http\Controllers;

use App\Models\AbsensiSekolah;
use App\Models\Siswa;
use EnumKehadiran;

class GetDataAbsensiController extends Controller
{
    public function get_absensi_sekolah()
    {
        return response()->json([
            'listSiswa' => Siswa::whereTahun(request('tahun'))
                ->whereKelasId(request('kelasId'))
                ->with([
                    'user',
                    'absensi' => fn ($q) => $q->whereTanggal(request('tanggal'))
                        ->whereJam(request('jam')),
                    'absensi.guru'
                ])
                ->get()
                ->sortBy('user.name')
                ->values()
        ]);
    }

    public function get_info_absensi_sekolah()
    {
        return response()->json([
            'listInfo' => AbsensiSekolah::whereTanggal(request('tanggal'))
                ->whereKelasId(request('kelasId'))
                ->where('kehadiran_id', '!=', EnumKehadiran::HADIR)
                ->with([
                    'siswa',
                    'kehadiran'
                ])
                ->get()
                ->sortBy(['user.name', 'jam'])
                ->values()
        ]);
    }
}
