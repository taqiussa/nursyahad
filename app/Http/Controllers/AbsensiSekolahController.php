<?php

namespace App\Http\Controllers;

use App\Models\AbsensiSekolah;
use App\Models\Kelas;
use App\Traits\InitTrait;
use App\Traits\SiswaTrait;
use EnumKehadiran;

class AbsensiSekolahController extends Controller
{
    use InitTrait;
    use SiswaTrait;

    public function index()
    {
        return inertia(
            'Guru/AbsensiSekolah',
            [
                'initTahun' => $this->data_tahun(),
                'initSemester' => $this->data_semester(),
                'listKelas' => Kelas::orderBy('nama')->get(),
                'listInfo' => AbsensiSekolah::whereTanggal(request('tanggal'))
                    ->whereKelasId(request('kelasId'))
                    ->where('kehadiran_id', '!=', EnumKehadiran::HADIR)
                    ->with([
                        'siswa' => fn ($q) => $q->select('nis', 'name')
                    ])
                    ->get()
                    ->sortBy(['siswa.name', 'jam'])
                    ->values(),
                'listKehadiran' => arrayKehadiran(),
                'listSiswa' => $this->data_siswa_with_absensi()
            ]
        );
    }

    public function nihil()
    {
    }
}
