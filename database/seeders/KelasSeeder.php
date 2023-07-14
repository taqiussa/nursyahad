<?php

namespace Database\Seeders;

use App\Models\Kelas;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama' => '1', 'tingkat' => 1],
            ['nama' => '2', 'tingkat' => 2],
            ['nama' => '3', 'tingkat' => 3],
            ['nama' => '4', 'tingkat' => 4],
            ['nama' => '5', 'tingkat' => 5],
            ['nama' => '6', 'tingkat' => 6],
        ];


        foreach ($data as $kelas) {
            Kelas::create([
                'nama' => $kelas['nama'],
                'tingkat' => $kelas['tingkat'],
            ]);
        }
    }
}
