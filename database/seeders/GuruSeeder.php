<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roziqin = User::create([
            'name' => 'Khoirur Roziqin,S.Sy',
            'username' => 'roziqin',
            'password' => bcrypt('sdkarakter'),
        ]);

        $roziqin->syncRoles(['Kepala Sekolah', 'Tata Usaha', 'Bendahara', 'Guru']);

        $users = [
            [
                'name' => 'Sofiana Dian Pratiwi, S.Pd',
                'username' => 'sofiana'
            ],
            [
                'name' => 'Laila Fitri Rahmawati, S.Pd',
                'username' => 'laila'
            ],
            [
                'name' => 'Afwah Ulya, S.Pd',
                'username' => 'ulya'
            ],
            [
                'name' => 'Sulistyowati, S.Pd',
                'username' => 'sulis'
            ],
            [
                'name' => 'Nur Cholidin, S.Pd',
                'username' => 'nur'
            ],
            [
                'name' => 'Ainur Rohmah, S.Pd',
                'username' => 'ainur'
            ],
        ];

        foreach ($users as $user) {
            $role = User::create([
                'name' => $user['name'],
                'username' => $user['username'],
                'password' => bcrypt('sdkarakter')
            ]);

            $role->assignRole('Guru');
        }
    }
}
