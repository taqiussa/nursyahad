<?php

namespace App\Imports;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ImportUserAndSiswa implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            User::create([
                'name' => $row['name'],
                'nis' => $row['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $row['nis'],
                'kelas_id' => $row['kelas_id'],
                'tingkat' => $row['tingkat'],
                'tahun' => $row['tahun'],
            ]);
        }
    }
}
