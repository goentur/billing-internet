<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class PaketInternet extends Model
{
    use HasUuids;
    protected $fillable = ['perusahaan_id', 'nama', 'harga'];

    function perusahaan()
    {
        return $this->belongsTo(Perusahaan::class);
    }
}
