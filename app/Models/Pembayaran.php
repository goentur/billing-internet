<?php

namespace App\Models;

use App\Enums\PembayaranStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasUuids;
    protected $fillable = ['user_id', 'pelanggan_id', 'paket_internet_id', 'tanggal_pembayaran', 'tanggal_transaksi', 'total', 'status'];

    protected $casts = [
        'status' => PembayaranStatus::class,
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    function paketInternet()
    {
        return $this->belongsTo(PaketInternet::class);
    }
}
