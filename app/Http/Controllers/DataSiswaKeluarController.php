<?php

namespace App\Http\Controllers;

use App\Traits\InitTrait;

class DataSiswaKeluarController extends Controller
{
    use InitTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return inertia('TataUsaha/DataSiswaKeluar', ['initTahun' => $this->data_tahun()]);
    }
}
