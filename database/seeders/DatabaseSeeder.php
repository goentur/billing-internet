<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();

        $developer = Role::create(['name' => 'DEVELOPER']);

        $userDeveloper = User::factory()->create([
            'email' => 'dev@abata.web.id',
            'name' => 'Developer',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole($developer);
    }
}
