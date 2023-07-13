<?php

namespace App\Http\Controllers;

use App\Models\AbsensiSekolah;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Traits\InitTrait;
use App\Traits\SiswaTrait;
use EnumKehadiran;

class AbsensiSekolahController extends Controller
{
    use InitTrait;
    use SiswaTrait;

    public function index()
    {
        return inertia(
            'Guru/AbsensiSekolah',
            [
                'initTahun' => $this->data_tahun(),
                'initSemester' => $this->data_semester(),
                'listKelas' => Kelas::orderBy('nama')->get(),
                'listInfo' => AbsensiSekolah::whereTanggal(request('tanggal'))
                    ->whereKelasId(request('kelasId'))
                    ->where('kehadiran_id', '!=', EnumKehadiran::HADIR)
                    ->with([
                        'siswa' => fn ($q) => $q->select('nis', 'name')
                    ])
                    ->get()
                    ->sortBy(['siswa.name', 'jam'])
                    ->values(),
                'listKehadiran' => arrayKehadiran(),
                'listSiswa' => $this->data_siswa_with_absensi()
            ]
        );
    }

    public function nihil()
    {
        request()->validate([
            'tanggal' => 'required',
            'tahun' => 'required',
            'jam' => 'required',
            'kelasId' => 'required'
        ]);

        $siswaBelumTerabsen = Siswa::whereTahun(request('tahun'))
            ->whereKelasId(request('kelasId'))
            ->whereDoesntHave(
                'absensi',
                fn ($q) => $q->whereTanggal(request('tanggal'))
                    ->whereJam(request('jam'))
            )
            ->each(
                fn ($q) =>
                AbsensiSekolah::create([
                    'nis' => $q->nis,
                    'kelas_id' => $q->kelas_id,
                    'kehadiran_id' => EnumKehadiran::HADIR,
                    'tahun' => request('tahun'),
                    'semester' => $this->data_semester(),
                    'tanggal' => request('tanggal'),
                    'jam' => request('jam'),
                    'user_id' => auth()->user()->id
                ])
            );

        return response()->json([
            'listSiswa' => $this->data_siswa_with_absensi()
        ]);
    }

    public function simpan()
    {
        request()->validate(
            [
                'tanggal' => 'required',
                'tahun' => 'required',
                'jam' => 'required',
                'kelasId' => 'required'
            ]
        );

        AbsensiSekolah::updateOrCreate(
            ['id' => request('id')],
            [
                'nis' => request('nis'),
                'kelas_id' => request('kelasId'),
                'kehadiran_id' => request('kehadiranId'),
                'tahun' => request('tahun'),
                'semester' => $this->data_semester(),
                'tanggal' => request('tanggal'),
                'jam' => request('jam'),
                'user_id' => auth()->user()->id,
            ]
        );

        return response()->json([
            'listSiswa' => $this->data_siswa_with_absensi(),
            'message' => 'Tersimpan',
            'nis' => request('nis')
        ]);
    }
}
