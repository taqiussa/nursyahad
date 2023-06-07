<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;

class BuatRoleController extends Controller
{
    public function index()
    {
        return inertia('Admin/BuatRole',
        [
            'listRole' => Role::orderBy('name')->get()
        ]);
    }

    public function simpan()
    {
        $validate = request()->validate(['name' => 'required', 'guard_name' => 'required']);

        Role::create($validate);

        return to_route('buat-role');
    }

    public function hapus()
    {
        Role::destroy(request('id'));

        return to_route('buat-role');
    }
}
