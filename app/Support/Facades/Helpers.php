<?php

namespace App\Support\Facades;

use Illuminate\Support\Traits\ForwardsCalls;
use Illuminate\Support\Traits\Macroable;

class Helpers
{
    use Macroable {
        __call as macroCall;
    }
    use ForwardsCalls;

    /**
     * Format a number with grouped thousands
     *
     * @param float|int $num
     * @param int $decimals
     * @param string $decimal_separator
     * @param string $thousands_separator
     * @return string
     */
    public static function ribuan($num, int $decimals = 0, string $decimal_separator = ',', string $thousands_separator = '.'): string
    {
        return number_format($num, $decimals, $decimal_separator, $thousands_separator);
    }
    public static function filename()
    {
        $s = strtoupper(md5(uniqid(rand(), true)));
        $kode =
            substr($s, 0, 8) . '-' .
            substr($s, 8, 4) . '-' .
            substr($s, 12, 4) . '-' .
            substr($s, 16, 4) . '-' .
            substr($s, 20) . '-' .
            time();
        return $kode;
    }

    public function __call($method, array $parameters)
    {
        if (static::hasMacro($method)) {
            return $this->macroCall($method, $parameters);
        }

        return $this->$method(...$parameters);
    }

    /**
     * Handle dynamic static method calls.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public static function __callStatic($method, $parameters)
    {
        return (new static)->$method(...$parameters);
    }
}
