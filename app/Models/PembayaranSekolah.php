<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PembayaranSekolah extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Get the gunabayar that owns the PembayaranSekolah
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gunabayar(): BelongsTo
    {
        return $this->belongsTo(GunabayarSekolah::class)->withDefault();
    }

    /**
     * Get the user that owns the PembayaranSekolah
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nis', 'nis')->withDefault();
    }
}
