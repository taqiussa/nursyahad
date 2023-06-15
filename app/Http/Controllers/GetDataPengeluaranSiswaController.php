<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\PemasukanSiswa;
use App\Models\PengeluaranSiswa;

class GetDataPengeluaranSiswaController extends Controller
{
    public function get_pengeluaran_siswa()
    {
        return response()->json([
            'listPengeluaran' => PengeluaranSiswa::whereNis(request('nis'))
                ->whereMonth('tanggal', Carbon::parse(request('tanggal'))->format('m'))
                ->orderByDesc('tanggal')
                ->get(),
            'listUangSaku' => PemasukanSiswa::whereNis(request('nis'))
                ->whereMonth('tanggal', Carbon::parse(request('tanggal'))->format('m'))
                ->get()
        ]);
    }
}
