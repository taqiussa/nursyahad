<?php

namespace App\Http\Controllers;

use App\Models\GunabayarSekolah;
use App\Models\PembayaranSekolah;
use App\Models\Siswa;
use App\Traits\InitTrait;

class InputPembayaranSekolahController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Bendahara/InputPembayaranSekolah',
            [
                'initTahun' => $this->data_tahun(),
                'listGunabayar' => GunabayarSekolah::get()
            ]
        );
    }

    public function simpan()
    {
        $validate = request()->validate([
            'tahun' => 'required',
            'tanggal' => 'required',
            'nis' => 'required',
            'gunabayar_id' => 'required',
            'jumlah' => 'required',
        ]);

        $siswa = Siswa::whereTahun(request('tahun'))
            ->whereNis(request('nis'))
            ->first();

        $validate['kelas_id'] = $siswa->kelas_id;
        $validate['tingkat'] = $siswa->tingkat;
        $validate['jumlah'] = ambilAngka(request('jumlah'));
        $validate['user_id'] = auth()->user()->id;

        PembayaranSekolah::create($validate);

        return to_route('input-pembayaran-sekolah');
    }

    public function hapus()
    {
        PembayaranSekolah::destroy(request('id'));

        return to_route('input-pembayaran-sekolah');
    }
}
