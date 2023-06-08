<?php

namespace App\Imports;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportUserAndSiswa implements ToCollection, WithHeadingRow, SkipsOnError, SkipsEmptyRows, SkipsOnFailure
{
    use SkipsErrors, SkipsFailures;
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            $user = User::create([
                'name' => $row['name'],
                'username' => $row['nis'],
                'nis' => $row['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $row['nis'],
                'kelas_id' => $row['kelas_id'],
                'tingkat' => $row['tingkat'],
                'tahun' => $row['tahun'],
            ]);

            $user->assignRole('Siswa');
        }
    }
}
