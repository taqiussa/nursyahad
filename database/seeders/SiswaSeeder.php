<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [];

        collect($students)->each(
            fn ($q) =>
            User::create([
                'name' => $q->name,
                'nis' => $q->nis,
                'username' => $q->nis,
                'password' => bcrypt('12345678')
            ])
        );
    }
}
