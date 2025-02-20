<?php

namespace App\Support\Facades;

use Closure;
use Illuminate\Support\Facades\Cache;

class Memo
{
    public static function make($key, Closure $callback, $lifetime = null)
    {
        return Cache::remember($key, $lifetime ?: config('cache.lifetime.minute'), $callback);
    }

    public static function forDay($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.day'));
    }

    public static function forHour($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.hour'));
    }

    public static function for3min($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.m3'));
    }

    public static function for5min($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.m5'));
    }

    public static function for10min($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.m10'));
    }

    public static function for30min($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.m30'));
    }

    public static function forMin($key, Closure $callback)
    {
        return static::make($key, $callback, config('cache.lifetime.minute'));
    }
}
