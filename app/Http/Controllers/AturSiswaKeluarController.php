<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\SiswaKeluar;
use App\Traits\InitTrait;

class AturSiswaKeluarController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('TataUsaha/AturSiswaKeluar', ['initTahun' => $this->data_tahun()]);
    }

    public function hapus()
    {
        $siswa = Siswa::find(request('id'));

        SiswaKeluar::create([
            'nis' => $siswa->nis,
            'tahun' => $siswa->tahun,
            'kelas_id' => $siswa->kelas_id,
            'tanggal' => date('Y-m-d')
        ]);

        $siswa->delete();
        
        return to_route('atur-siswa-keluar');
    }
}
