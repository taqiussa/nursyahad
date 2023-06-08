<?php

namespace App\Http\Controllers;

use App\Traits\InitTrait;

class DataSiswaController extends Controller
{
    use InitTrait;

    public function __invoke()
    {
        return inertia('TataUsaha/DataSiswa', ['initTahun' => $this->data_tahun()]);
    }
}
