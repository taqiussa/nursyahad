<?php

namespace App\Traits;

use App\Models\Siswa;

trait SiswaTrait
{
    public function data_siswa_with_absensi()
    {
        return Siswa::whereTahun(request('tahun'))
            ->whereKelasId(request('kelasId'))
            ->with([
                'user' => fn ($q) => $q->select('nis', 'name'),
                'absensi' => fn ($q) => $q->whereTanggal(request('tanggal'))
                    ->whereJam(request('jam')),
                'absensi.guru' => fn ($q) => $q->select('id', 'name')
            ])
            ->get()
            ->sortBy('user.name')
            ->values();
    }
}
