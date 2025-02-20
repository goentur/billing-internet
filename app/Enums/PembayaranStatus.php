<?php

namespace App\Enums;

enum PembayaranStatus: string
{
    case MENUNGGU = 'MENUNGGU';
    case SELESAI = 'SELESAI';
    case BATAL = 'BATAL';

    public function label(): string
    {
        return match ($this) {
            self::MENUNGGU => 'MENUNGGU',
            self::SELESAI => 'SELESAI',
            self::BATAL => 'BATAL',
        };
    }
}
