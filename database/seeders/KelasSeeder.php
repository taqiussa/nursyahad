<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\KategoriKelas;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama' => '1', 'tingkat' => 1, 'kategori_kelas_id' => 1],
            ['nama' => '2', 'tingkat' => 2, 'kategori_kelas_id' => 1],
            ['nama' => '3', 'tingkat' => 3, 'kategori_kelas_id' => 1],
            ['nama' => '4', 'tingkat' => 4, 'kategori_kelas_id' => 1],
            ['nama' => '5', 'tingkat' => 5, 'kategori_kelas_id' => 1],
            ['nama' => '6', 'tingkat' => 6, 'kategori_kelas_id' => 1],
            ['nama' => '1 - Inklusi', 'tingkat' => 1, 'kategori_kelas_id' => 2],
            ['nama' => '2 - Inklusi', 'tingkat' => 2, 'kategori_kelas_id' => 2],
            ['nama' => '3 - Inklusi', 'tingkat' => 3, 'kategori_kelas_id' => 2],
            ['nama' => '4 - Inklusi', 'tingkat' => 4, 'kategori_kelas_id' => 2],
            ['nama' => '5 - Inklusi', 'tingkat' => 5, 'kategori_kelas_id' => 2],
            ['nama' => '6 - Inklusi', 'tingkat' => 6, 'kategori_kelas_id' => 2],
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
    }
}
