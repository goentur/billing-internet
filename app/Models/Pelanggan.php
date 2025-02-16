<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    use HasUuids;
    protected $fillable = ['perusahaan_id', 'odp_id', 'paket_internet_id', 'nama', 'tanggal_bayar', 'telp', 'alamat'];

    function paketInternet()
    {
        return $this->belongsTo(PaketInternet::class);
    }
    function odp()
    {
        return $this->belongsTo(Odp::class);
    }
}
