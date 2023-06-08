<?php

namespace Database\Seeders;

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

        $data = [
            ['nama' => '1', 'tingkat' => 1],
            ['nama' => '2', 'tingkat' => 2],
            ['nama' => '3', 'tingkat' => 3],
            ['nama' => '4', 'tingkat' => 4],
            ['nama' => '5', 'tingkat' => 5],
            ['nama' => '6', 'tingkat' => 6],
            ['nama' => '3 - Inklusi', 'tingkat' => 3],
        ];

        $user = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'password' => bcrypt('asdfasdf'),
        ]);

        $user->assignRole('Admin');
    }
}
