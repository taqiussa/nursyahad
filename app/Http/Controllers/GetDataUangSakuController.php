<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\PemasukanSiswa;

class GetDataUangSakuController extends Controller
{
    public function get_uang_saku()
    {
        return response()->json([
            'listPemasukan' => PemasukanSiswa::whereNis(request('nis'))
                ->whereMonth('tanggal', Carbon::parse(request('tanggal'))->format('m'))
                ->get()
        ]);
    }
}
