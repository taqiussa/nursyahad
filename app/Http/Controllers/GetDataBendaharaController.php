<?php

namespace App\Http\Controllers;

use App\Traits\WajibBayarTrait;

class GetDataBendaharaController extends Controller
{
    use WajibBayarTrait;

    public function get_wajib_bayar_sekolah()
    {
        return response()->json([
            'listWajibBayar' => $this->wajib_bayar_sekolah()
        ]);
    }
}
