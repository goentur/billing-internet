<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Perusahaan extends Model
{
    use HasUuids, SoftDeletes;
    protected $fillable = ['nama', 'telp', 'alamat', 'koordinat', 'logo', 'token_wa'];
}
