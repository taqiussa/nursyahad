<?php

namespace App\Http\Controllers;

use App\Models\GunabayarSekolah;
use App\Models\WajibBayarSekolah;
use App\Traits\InitTrait;

class AturWajibBayarSekolahController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Bendahara/AturWajibBayarSekolah',
            [
                'initTahun' => $this->data_tahun(),
                'listGunabayar' => GunabayarSekolah::get()
            ]
        );
    }

    public function simpan()
    {
        $validate = request()->validate([
            'gunabayar_id' => 'required',
            'jumlah' => 'required',
            'tahun' => 'required'
        ]);

        $validate['jumlah'] = ambilAngka(request('jumlah'));
        
        WajibBayarSekolah::create($validate);

        return to_route('atur-wajib-bayar-sekolah');
    }

    public function hapus()
    {
        WajibBayarSekolah::destroy(request('id'));

        return to_route('atur-wajib-bayar-sekolah');
    }
}
