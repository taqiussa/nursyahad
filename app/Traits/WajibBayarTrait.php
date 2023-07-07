<?php

namespace App\Traits;

use App\Models\WajibBayarSekolah;

trait WajibBayarTrait
{
    public function wajib_bayar_sekolah()
    {
        return WajibBayarSekolah::whereTahun(request('tahun'))
            ->with('gunabayar')
            ->get();
    }
}
