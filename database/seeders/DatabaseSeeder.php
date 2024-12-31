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
        Permission::create(['name' => 'index-zona-waktu']);
        Permission::create(['name' => 'create-zona-waktu']);
        Permission::create(['name' => 'update-zona-waktu']);
        Permission::create(['name' => 'delete-zona-waktu']);
        // perusahaan
        Permission::create(['name' => 'index-perusahaan']);
        Permission::create(['name' => 'create-perusahaan']);
        Permission::create(['name' => 'update-perusahaan']);
        Permission::create(['name' => 'delete-perusahaan']);
        // paket-internet
        Permission::create(['name' => 'index-paket-internet']);
        Permission::create(['name' => 'create-paket-internet']);
        Permission::create(['name' => 'update-paket-internet']);
        Permission::create(['name' => 'delete-paket-internet']);
        // pelanggan
        Permission::create(['name' => 'index-pelanggan']);
        Permission::create(['name' => 'create-pelanggan']);
        Permission::create(['name' => 'update-pelanggan']);
        Permission::create(['name' => 'delete-pelanggan']);
        // pemilik
        Permission::create(['name' => 'index-pemilik']);
        Permission::create(['name' => 'create-pemilik']);
        Permission::create(['name' => 'update-pemilik']);
        Permission::create(['name' => 'delete-pemilik']);
        // pegawai
        Permission::create(['name' => 'index-pegawai']);
        Permission::create(['name' => 'create-pegawai']);
        Permission::create(['name' => 'update-pegawai']);
        Permission::create(['name' => 'delete-pegawai']);
        // transaksi
        Permission::create(['name' => 'index-pembayaran']);
        Permission::create(['name' => 'create-pembayaran']);
        // laporan
        Permission::create(['name' => 'index-laporan-pembayaran']);
        Permission::create(['name' => 'print-laporan-pembayaran']);
        Permission::create(['name' => 'index-laporan-piutang']);
        Permission::create(['name' => 'print-laporan-piutang']);
        // pengguna
        Permission::create(['name' => 'index-pengguna']);
        Permission::create(['name' => 'create-pengguna']);
        Permission::create(['name' => 'update-pengguna']);
        Permission::create(['name' => 'delete-pengguna']);
        // role
        Permission::create(['name' => 'index-role']);
        Permission::create(['name' => 'create-role']);
        Permission::create(['name' => 'update-role']);
        Permission::create(['name' => 'delete-role']);
        // permission
        Permission::create(['name' => 'index-permission']);
        Permission::create(['name' => 'create-permission']);
        Permission::create(['name' => 'update-permission']);
        Permission::create(['name' => 'delete-permission']);
        $developer = Role::create(['name' => 'DEVELOPER']);
        $developer->givePermissionTo([
            'index-zona-waktu',
            'create-zona-waktu',
            'update-zona-waktu',
            'delete-zona-waktu',
            'index-perusahaan',
            'create-perusahaan',
            'update-perusahaan',
            'delete-perusahaan',
            'index-paket-internet',
            'create-paket-internet',
            'update-paket-internet',
            'delete-paket-internet',
            'index-pelanggan',
            'create-pelanggan',
            'update-pelanggan',
            'delete-pelanggan',
            'index-pemilik',
            'create-pemilik',
            'update-pemilik',
            'delete-pemilik',
            'index-pegawai',
            'create-pegawai',
            'update-pegawai',
            'delete-pegawai',
            'index-pembayaran',
            'create-pembayaran',
            'index-laporan-pembayaran',
            'print-laporan-pembayaran',
            'index-laporan-piutang',
            'print-laporan-piutang',
            'index-pengguna',
            'create-pengguna',
            'update-pengguna',
            'delete-pengguna',
            'index-role',
            'create-role',
            'update-role',
            'delete-role',
            'index-permission',
            'create-permission',
            'update-permission',
            'delete-permission',
        ]);
        $userDeveloper = User::factory()->create([
            'email' => 'dev@abata.web.id',
            'name' => 'Developer',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole($developer);
    }
}
