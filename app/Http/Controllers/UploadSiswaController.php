<?php

namespace App\Http\Controllers;

use App\Imports\ImportUserAndSiswa;
use Maatwebsite\Excel\Facades\Excel;

class UploadSiswaController extends Controller
{
    public function index()
    {
        return inertia('Admin/UploadSiswa');
    }

    public function upload(){

        request()->validate(['fileUpload' => 'required|mimes:xls,xlsx']);

        set_time_limit(0);

        Excel::import(new ImportUserAndSiswa(), request('fileUpload'));

        return to_route('upload-siswa');
    }
}
