<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //zona waktu
        Permission::create(['name' => 'zona-waktu-index']);
        Permission::create(['name' => 'zona-waktu-create']);
        Permission::create(['name' => 'zona-waktu-update']);
        Permission::create(['name' => 'zona-waktu-delete']);
        // perusahaan
        Permission::create(['name' => 'perusahaan-index']);
        Permission::create(['name' => 'perusahaan-create']);
        Permission::create(['name' => 'perusahaan-update']);
        Permission::create(['name' => 'perusahaan-delete']);
        // paket-internet
        Permission::create(['name' => 'paket-internet-index']);
        Permission::create(['name' => 'paket-internet-create']);
        Permission::create(['name' => 'paket-internet-update']);
        Permission::create(['name' => 'paket-internet-delete']);
        // odp
        Permission::create(['name' => 'odp-index']);
        Permission::create(['name' => 'odp-create']);
        Permission::create(['name' => 'odp-update']);
        Permission::create(['name' => 'odp-delete']);
        // pelanggan
        Permission::create(['name' => 'pelanggan-index']);
        Permission::create(['name' => 'pelanggan-create']);
        Permission::create(['name' => 'pelanggan-update']);
        Permission::create(['name' => 'pelanggan-delete']);
        // pemilik
        Permission::create(['name' => 'pemilik-index']);
        Permission::create(['name' => 'pemilik-create']);
        Permission::create(['name' => 'pemilik-update']);
        Permission::create(['name' => 'pemilik-delete']);
        // pegawai
        Permission::create(['name' => 'pegawai-index']);
        Permission::create(['name' => 'pegawai-create']);
        Permission::create(['name' => 'pegawai-update']);
        Permission::create(['name' => 'pegawai-delete']);
        // transaksi
        Permission::create(['name' => 'pembayaran-index']);
        Permission::create(['name' => 'pembayaran-create']);
        // laporan
        Permission::create(['name' => 'laporan-pembayaran-index']);
        Permission::create(['name' => 'laporan-pembayaran-print']);
        Permission::create(['name' => 'laporan-piutang-index']);
        Permission::create(['name' => 'laporan-piutang-print']);
        // pengguna
        Permission::create(['name' => 'pengguna-index']);
        Permission::create(['name' => 'pengguna-create']);
        Permission::create(['name' => 'pengguna-update']);
        Permission::create(['name' => 'pengguna-delete']);
        // role
        Permission::create(['name' => 'role-index']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);
        // permission
        Permission::create(['name' => 'permission-index']);
        Permission::create(['name' => 'permission-create']);
        Permission::create(['name' => 'permission-update']);
        Permission::create(['name' => 'permission-delete']);
        $developer = Role::create(['name' => 'DEVELOPER']);
        $developer->givePermissionTo(['zona-waktu-index',
            'zona-waktu-create',
            'zona-waktu-update',
            'zona-waktu-delete',
            'perusahaan-index',
            'perusahaan-create',
            'perusahaan-update',
            'perusahaan-delete',
            'pemilik-index',
            'pemilik-create',
            'pemilik-update',
            'pemilik-delete',
            'pengguna-index',
            'pengguna-create',
            'pengguna-update',
            'pengguna-delete',
            'role-index',
            'role-create',
            'role-update',
            'role-delete',
            'permission-index',
            'permission-create',
            'permission-update',
            'permission-delete',
        ]);
        $userDeveloper = User::factory()->create([
            'email' => 'dev@abata.web.id',
            'name' => 'Developer',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole($developer);
        $pemilik = Role::create(['name' => 'PEMILIK']);
        $pemilik->givePermissionTo([
            'paket-internet-index',
            'paket-internet-create',
            'paket-internet-update',
            'paket-internet-delete',
            'odp-index',
            'odp-create',
            'odp-update',
            'odp-delete',
            'pelanggan-index',
            'pelanggan-create',
            'pelanggan-update',
            'pelanggan-delete',
            'pegawai-index',
            'pegawai-create',
            'pegawai-update',
            'pegawai-delete',
            'pembayaran-index',
            'pembayaran-create',
            'laporan-pembayaran-index',
            'laporan-pembayaran-print',
            'laporan-piutang-index',
            'laporan-piutang-print',
        ]);
        $pegawai = Role::create(['name' => 'PEGAWAI']);
        $pegawai->givePermissionTo([
            'paket-internet-index',
            'paket-internet-create',
            'paket-internet-update',
            'odp-index',
            'odp-create',
            'odp-update',
            'pelanggan-index',
            'pelanggan-create',
            'pelanggan-update',
            'pembayaran-index',
            'pembayaran-create',
            'laporan-pembayaran-index',
            'laporan-pembayaran-print',
            'laporan-piutang-index',
            'laporan-piutang-print',
        ]);
    }
}
