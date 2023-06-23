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
use Illuminate\Support\Facades\Storage;

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

        $listProvinsi = Provinsi::orderBy('name')->get();
        $provinsi = $listProvinsi->where('name', $siswa->alamat?->provinsi)->first()?->code;
        $listKabupaten = Kabupaten::whereProvinceCode($provinsi)->orderBy('name')->get();
        $kabupaten = $listKabupaten->where('name', $siswa->alamat?->kabupaten)->first()?->code;
        $listKecamatan = Kecamatan::whereCityCode($kabupaten)->orderBy('name')->get();
        $kecamatan = $listKecamatan->where('name', $siswa->alamat?->kecamatan)->first()?->code;
        $listDesa = Desa::whereDistrictCode($kecamatan)->orderBy('name')->get();
        $desa = $listDesa->where('name', $siswa->alamat?->desa)->first()?->code;


        return inertia('TataUsaha/EditSiswa', [
            'siswa' => $siswa,
            'desa' => $desa,
            'kecamatan' => $kecamatan,
            'kabupaten' => $kabupaten,
            'provinsi' => $provinsi,
            'listProvinsi' => $listProvinsi,
            'initListKabupaten' => $listKabupaten,
            'initListKecamatan' => $listKecamatan,
            'initListDesa' => $listDesa,
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

            $user =  User::create([
                'name' => request('nama'),
                'nis' => request('nis'),
                'username' => request('nis'),
                'jenis_kelamin' => request('jenisKelamin'),
                'foto' => $imageName ?? '',
                'password' => bcrypt('12345678')
            ]);

            $user->assignRole('Siswa');

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
            'nama' => 'required',
            'jenisKelamin' => 'required',
        ]);

        $user = User::whereNis(request('nis'))->first();

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

        $imageName ?
            Storage::delete('public/foto/' . $user->foto)
            :
            null;


        $imageName ?
            $user->update([
                'name' => request('nama'),
                'jenis_kelamin' => request('jenisKelamin'),
                'nis' => request('nis'),
                'username' => request('nis'),
                'foto' => $imageName
            ])
            :
            $user->update([
                'name' => request('nama'),
                'jenis_kelamin' => request('jenisKelamin'),
                'nis' => request('nis'),
                'username' => request('nis'),
            ]);

        return to_route('data-siswa');
    }

    public function hapus()
    {
        User::destroy(request('id'));

        return to_route('data-siswa');
    }
}
