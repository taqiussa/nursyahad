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
        $user = User::create([
            'name' => 'administrator',
            'username' => 'administrator',
            'password' => bcrypt('asdfasdf'),
        ]);

        $user->assignRole('Admin');
    }
}
