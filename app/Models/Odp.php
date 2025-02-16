<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Odp extends Model
{
    use HasUuids;
    protected $fillable = ['perusahaan_id', 'nama', 'alamat', 'koordinat'];

    function perusahaan()
    {
        return $this->belongsTo(Perusahaan::class);
    }
}
