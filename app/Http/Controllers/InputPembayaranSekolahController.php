<?php

namespace App\Http\Controllers;

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
            ]
        );
    }
}
