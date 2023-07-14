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
                'listKehadiran' => AbsensiSekolah::whereMonth('tanggal', request('bulan'))
                    ->whereNis(auth()->user()->nis)
                    ->with(['guru:id,name'])
                    ->orderByDesc('tanggal')
                    ->get()
            ]
        );
    }
}
