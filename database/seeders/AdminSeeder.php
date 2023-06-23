<?php

namespace Database\Seeders;

use App\Models\KategoriKelas;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'Admin', 'guard_name' => 'web']);
        Role::create(['name' => 'Kepala Sekolah', 'guard_name' => 'web']);
        Role::create(['name' => 'Bendahara', 'guard_name' => 'web']);
        Role::create(['name' => 'Guru', 'guard_name' => 'web']);
        Role::create(['name' => 'Tata Usaha', 'guard_name' => 'web']);
        Role::create(['name' => 'Siswa', 'guard_name' => 'web']);

        $data = [
            ['nama' => '1', 'tingkat' => 1, 'kategori_kelas_id' => 1],
            ['nama' => '2', 'tingkat' => 2, 'kategori_kelas_id' => 1],
            ['nama' => '3', 'tingkat' => 3, 'kategori_kelas_id' => 1],
            ['nama' => '4', 'tingkat' => 4, 'kategori_kelas_id' => 1],
            ['nama' => '5', 'tingkat' => 5, 'kategori_kelas_id' => 1],
            ['nama' => '6', 'tingkat' => 6, 'kategori_kelas_id' => 1],
            ['nama' => '3 - Inklusi', 'tingkat' => 3, 'kategori_kelas_id' => 2],
        ];

        KategoriKelas::create(['nama' => 'Umum']);
        KategoriKelas::create(['nama' => 'Inklusi']);

        foreach ($data as $kelas) {
            Kelas::create([
                'nama' => $kelas['nama'],
                'tingkat' => $kelas['tingkat'],
                'kategori_kelas_id' => $kelas['kategori_kelas_id'],
            ]);
        }
        
        $user = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'password' => bcrypt('asdfasdf'),
        ]);

        $user->assignRole('Admin');

        $roziqin = User::create([
            'name' => 'Khoirur Roziqin,S.Sy',
            'username' => 'roziqin',
            'password' => bcrypt('sdkarakter'),
        ]);

        $roziqin->syncRoles(['Kepala Sekolah', 'Tata Usaha', 'Bendahara', 'Guru']);

        $demo = User::create([
            'name' => 'Demo',
            'username' => 'demo',
            'password' => bcrypt('12345678'),
        ]);

        $demo->assignRole('Tata Usaha');
    }
}
