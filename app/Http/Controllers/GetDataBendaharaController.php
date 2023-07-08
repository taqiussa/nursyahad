<?php

namespace App\Http\Controllers;

use App\Models\WajibBayarSekolah;
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

    public function get_gunabayar()
    {
        switch (request('kategori')) {
            case 'Sekolah':
                $jumlah = WajibBayarSekolah::whereTahun(request('tahun'))
                    ->whereGunabayarId(request('gunabayarId'))
                    ->first()
                    ?->jumlah ?? '0';
                break;

            default:
                $jumlah = '0';
                break;
        }

        return response()->json([
            'jumlah' => $jumlah
        ]);
    }
}
