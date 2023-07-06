<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WajibBayarSekolah extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Get the gun that owns the WajibBayarSekolah
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gunabayar(): BelongsTo
    {
        return $this->belongsTo(GunabayarSekolah::class)->withDefault();
    }
}
