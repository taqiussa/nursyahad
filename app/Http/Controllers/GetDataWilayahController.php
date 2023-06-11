<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;

class GetDataWilayahController extends Controller
{
    public function desa()
    {
        return response()->json([
            'listDesa' => Desa::whereDistrictCode(request('kecamatan'))
                ->orderBy('name')
                ->get()
        ]);
    }

    public function kabupaten()
    {
        return response()->json([
            'listKabupaten' => Kabupaten::whereProvinceCode(request('provinsi'))
                ->orderBy('name')
                ->get()
        ]);
    }

    public function kecamatan()
    {
        return response()->json([
            'listKecamatan' => Kecamatan::whereCityCode(request('kabupaten'))
                ->orderBy('name')
                ->get()
        ]);
    }
}
