<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'nis',
        'jenis_kelamin',
        'foto',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the alamat associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function alamat(): HasOne
    {
        return $this->hasOne(Alamat::class, 'nis', 'nis');
    }

    /**
     * Get the biodata associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function biodata(): HasOne
    {
        return $this->hasOne(Biodata::class, 'nis', 'nis');
    }

    /**
     * Get all of the pengeluarans for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pengeluarans(): HasMany
    {
        return $this->hasMany(Pengeluaran::class, 'nis', 'nis');
    }

    /**
     * Get the siswa associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function siswa(): HasOne
    {
        return $this->hasOne(Siswa::class, 'nis', 'nis')->withDefault();
    }
}
