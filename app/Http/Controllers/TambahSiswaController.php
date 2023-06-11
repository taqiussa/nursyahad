<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\User;
use App\Models\Biodata;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Provinsi;

class TambahSiswaController extends Controller
{
    public function index()
    {
        return inertia('TataUsaha/TambahSiswa', ['listProvinsi' => Provinsi::orderBy('name')->get()]);
    }

    public function edit()
    {
        $siswa = User::whereNis(request('nis'))
            ->with(
                [
                    'alamat',
                    'biodata'
                ]
            )
            ->first();

        $desa = Desa::whereName($siswa->alamat->desa)->first()->code;
        $kecamatan = Kecamatan::whereName($siswa->alamat->kecamatan)->first()->code;
        $kabupaten = Kabupaten::whereName($siswa->alamat->kabupaten)->first()->code;
        $provinsi = Provinsi::whereName($siswa->alamat->provinsi)->first()->code;

        return inertia('TataUsaha/EditSiswa', [
            'siswa' => $siswa,
            'desa' => $desa,
            'kecamatan' => $kecamatan,
            'kabupaten' => $kabupaten,
            'provinsi' => $provinsi,
        ]);
    }

    public function simpan()
    {
        request()->validate(
            [
                'nama' => 'required',
                'nis' => 'required|unique:users,nis',
                'jenisKelamin' => 'required',
            ],
            [
                'name.required' => 'Isi Nama',
                'jenisKelamin.required' => 'Pilih Jenis Kelamin',
                'nis.required' => 'Isi NIS',
                'nis.unique' => 'NIS Sudah Dipakai',
            ]
        );

        User::create([
            'name' => request('nama'),
            'nis' => request('nis'),
            'password' => bcrypt('12345678')
        ]);

        Biodata::create([
            'nis' => request('nis'),
            'nisn' => request('nisn'),
            'nik' => request('nik'),
            'jenis_kelamin' => request('jenisKelamin'),
            'tempat_lahir' => request('tempatLahir'),
            'tanggal_lahir' => request('tanggalLahir'),
            'nama_ayah' => request('namaAyah'),
            'nama_ibu' => request('namaIbu'),
        ]);

        $desa = Desa::whereCode(request('desa'))->first()?->name;
        $kecamatan = Kecamatan::whereCode(request('kecamatan'))->first()?->name;
        $kabupaten = Kabupaten::whereCode(request('kabupaten'))->first()?->name;
        $provinsi = Provinsi::whereCode(request('provinsi'))->first()?->name;

        Alamat::create([
            'nis' => request('nis'),
            'alamat_lengkap' => request('alamatLengkap'),
            'rt' => request('rt'),
            'rw' => request('rw'),
            'desa' => $desa,
            'kecamatan' => $kecamatan,
            'kabupaten' => $kabupaten,
            'provinsi' => $provinsi,
        ]);

        return to_route('tambah-siswa');
    }
    public function update()
    {
        request()->validate([
            'name' => 'required',
            'jenisKelamin' => 'required',
        ]);

        $user = User::find(request('id'));

        $user->biodata()->updateOrCreate(
            [],
            [
                'nis' => request('nis'),
                'nisn' => request('nisn'),
                'jenis_kelamin' => request('jenisKelamin'),
                'tempat_lahir' => request('tempatLahir'),
                'tanggal_lahir' => request('tanggalLahir'),
                'nik' => request('nik'),
                'nama_ayah' => request('namaAyah'),
                'nama_ibu' => request('namaIbu'),
            ]
        );

        $desa = Desa::whereCode(request('desa'))->first()?->name;
        $kecamatan = Kecamatan::whereCode(request('kecamatan'))->first()?->name;
        $kabupaten = Kabupaten::whereCode(request('kabupaten'))->first()?->name;
        $provinsi = Provinsi::whereCode(request('provinsi'))->first()?->name;

        $user->alamat()->updateOrCreate(
            [],
            [
                'nis' => request('nis'),
                'alamat_lengkap' => request('alamatLengkap'),
                'rt' => request('rt'),
                'rw' => request('rw'),
                'desa' => $desa,
                'kecamatan' => $kecamatan,
                'kabupaten' => $kabupaten,
                'provinsi' => $provinsi,
            ]
        );

        $user->update([
            'name' => request('nama'),
            'nis' => request('nis'),
        ]);

        return to_route('data-siswa');
    }

    public function hapus()
    {
        User::destroy(request('id'));

        return to_route('data-siswa');
    }
}
