<?php

namespace App\Http\Controllers;

use App\Models\PemasukanSiswa;
use App\Traits\InitTrait;

class InputUangSakuController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Bendahara/InputUangSaku',
            [
                'initTahun' => $this->data_tahun(),
                'initSemester' => $this->data_semester()
            ]
        );
    }

    public function simpan()
    {
        request()->validate([
            'tanggal' => 'required',
            'jumlah' => 'required',
            'nis' => 'required'
        ]);

        $jumlah = ambilAngka(request('jumlah'));

        PemasukanSiswa::create([
            'nis' => request('nis'),
            'tahun' => request('tahun'),
            'semester' => request('semester'),
            'tanggal' => request('tanggal'),
            'keterangan' => request('keterangan'),
            'user_id' => auth()->user()->id,
            'jumlah' => $jumlah
        ]);

        return to_route('input-uang-saku');
    }

    public function hapus()
    {
        PemasukanSiswa::destroy(request('id'));

        return to_route('input-uang-saku');
    }
}
