<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $authData = Cache::remember(__CLASS__ . '\\' . $request->user()?->id, config('cache.lifetime.hour '), function () use ($request) {
            return [
                'user' => $request->user(),
                'permissions' => $request->user()?->roles[0]->permissions->pluck('name'),
                'perusahaan' => [
                    'id' => $request->user()?->perusahaan[0]?->id ?? time(),
                    'nama' => $request->user()?->perusahaan[0]?->nama ?? 'DEVELOPER ABATA TECH',
                ],
            ];
        });
        return [
            ...parent::share($request),
            'auth' => $authData,
            'flash' => [
                'error' => fn() => $request->session()->get('error'),
                'success' => fn() => $request->session()->get('success'),
            ],
        ];
    }
}
