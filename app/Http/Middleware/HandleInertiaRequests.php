<?php

namespace App\Http\Middleware;

use App\Support\Facades\Memo;
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
        $authData = Memo::forHour('share-data-' . $request->user()?->id, function () use ($request) {
            $user = $request->user();
            $perusahaan = $user?->perusahaan[0] ?? null;
            $koordinat = $perusahaan?->koordinat
                ? array_reverse(explode(", ", $perusahaan->koordinat))
                : [109.52646521589804, -7.01800386097385];

            return [
                'user' => $user,
                'permissions' => $user?->roles[0]->permissions->pluck('name'),
                'perusahaan' => [
                    'id' => $perusahaan?->id ?? time(),
                    'nama' => $perusahaan?->nama ?? 'DEVELOPER ABATA TECH',
                    'telp' => $perusahaan?->telp ?? '+62 877-9905-8312',
                    'koordinat' => $koordinat,
                    'alamat' => $perusahaan?->alamat ?? '',
                    'logo' => $perusahaan?->logo ? asset('storage/' . $perusahaan?->logo) : '',
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
