<?php

namespace App\Http\Controllers;

use App\Models\AbsensiSekolah;
use App\Traits\InitTrait;

class KehadiranSekolahController extends Controller
{
    use InitTrait;

    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return inertia(
            'Siswa/KehadiranSekolah',
            [
                'initTahun' => $this->data_tahun(),
                'listAbsensi' => AbsensiSekolah::whereMonth('tanggal', request('bulan'))
                    ->whereNis(auth()->user()->nis)
                    // ->with(['guru:id,name'])
                    ->get(),
                'listKehadiran' => AbsensiSekolah::whereMonth('tanggal', request('bulan'))
                    ->whereNis(auth()->user()->nis)
                    ->groupBy('tanggal')
                    ->selectRaw('tanggal')
                    ->orderByDesc('tanggal')
                    ->get()
            ]
        );
    }
}
