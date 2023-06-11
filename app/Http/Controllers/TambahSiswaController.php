<?php

namespace App\Http\Controllers;

use App\Models\Alamat;
use App\Models\User;
use App\Models\Biodata;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Kelas;
use App\Models\Provinsi;
use App\Models\Siswa;
use App\Traits\InitTrait;

class TambahSiswaController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('TataUsaha/TambahSiswa', [
            'initTahun' => $this->data_tahun(),
            'listProvinsi' => Provinsi::orderBy('name')->get(),
            'listKelas' => Kelas::orderBy('nama')->get()
        ]);
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

        try {

            $imageName = null;

            if (request()->hasFile('foto')) {
                $image = request()->file('foto');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/foto'), $imageName);
            }

            User::create([
                'name' => request('nama'),
                'nis' => request('nis'),
                'username' => request('nis'),
                'foto' => $imageName ?? '',
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

            $kelas = Kelas::find(request('kelasId'));

            Siswa::create([
                'nis' => request('nis'),
                'tahun' => request('tahun'),
                'kelas_id' => request('kelasId'),
                'tingkat' => $kelas->tingkat,
            ]);

            return to_route('tambah-siswa');
        } catch (\Throwable $th) {
            return back()->withErrors($th);
        }
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

        $imageName = null;

        if (request()->hasFile('foto')) {
            $image = request()->file('foto');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/foto'), $imageName);
        }

        $user->update([
            'name' => request('nama'),
            'nis' => request('nis'),
            'username' => request('nis'),
            'foto' => $imageName ?? '',
        ]);

        return to_route('data-siswa');
    }

    public function hapus()
    {
        User::destroy(request('id'));

        return to_route('data-siswa');
    }
}
