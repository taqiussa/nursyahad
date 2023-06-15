<?php

namespace App\Http\Controllers;

use App\Models\PengeluaranSiswa;

class GetDataPengeluaranSiswaController extends Controller
{
    public function get_pengeluaran_siswa()
    {
        return response()->json([
            'listPengeluaran' => PengeluaranSiswa::whereNis(request('nis'))
                ->whereMonth('tanggal', request('tanggal'))
                ->orderByDesc('tanggal')
                ->get()
        ]);
    }
}
