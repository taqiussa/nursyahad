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

        $admin = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'password' => bcrypt('asdfasdf'),
        ]);

        $admin->assignRole('Admin');
        
    }
}
