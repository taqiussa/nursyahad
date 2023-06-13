<?php

namespace App\Http\Controllers;

use App\Traits\InitTrait;
use App\Models\PengeluaranSiswa;

class InputPengeluaranSiswaController extends Controller
{
    use InitTrait;
    public function index()
    {
        return inertia(
            'Bendahara/InputPengeluaranSiswa',
            [
                'initTahun' => $this->data_tahun(),
                'initSemester' => $this->data_semester(),
            ]
        );
    }

    public function simpan()
    {
        request()->validate([
            'tanggal' => 'required',
            'jumlah' => 'required',
            'nis' => 'required',
        ]);

        $jumlah = ambilAngka(request('jumlah'));

        PengeluaranSiswa::create([
            'nis' => request('nis'),
            'tahun' => request('tahun'),
            'semester' => request('semester'),
            'tanggal' => request('tanggal'),
            'jumlah' => $jumlah,
            'keterangan' => request('keterangan'),
            'user_id' => auth()->user()->id
        ]);

        return to_route('input-pengeluaran-siswa');
    }

    public function hapus()
    {
        PengeluaranSiswa::destroy(request('id'));

        return to_route('input-pengeluaran-siswa');
    }
}
