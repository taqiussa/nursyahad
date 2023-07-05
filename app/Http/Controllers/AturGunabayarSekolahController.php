<?php

namespace App\Http\Controllers;

use App\Models\GunabayarSekolah;

class AturGunabayarSekolahController extends Controller
{
    public function index()
    {
        return inertia(
            'Bendahara/AturGunabayarSekolah',
            [
                'listGunabayar' => GunabayarSekolah::get()
            ]
        );
    }

    public function simpan()
    {
        $validate = request()->validate(['nama' => 'required']);

        GunabayarSekolah::create($validate);

        return to_route('atur-gunabayar-sekolah');
    }

    public function hapus()
    {
        GunabayarSekolah::destroy(request('id'));

        return to_route('atur-gunabayar-sekolah');
    }
}
