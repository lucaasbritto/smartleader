<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;

class InitialSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::create([
            'name' => 'Kings Betta',
            'identifier' => '546515410001',
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@teste.com',
            'password' => Hash::make('123456'),
            'company_id' => $company->id,
            'is_admin' => '1',
        ]);

        $user = User::create([
            'name' => 'Usuário',
            'email' => 'user@teste.com',
            'password' => Hash::make('123456'),
            'company_id' => $company->id,
            'is_admin' => '0',
        ]);

         $users = User::factory()->count(3)->create([
            'company_id' => $company->id,
            'is_admin' => '0'
        ]);

        $allUsers = collect([$admin, $user])->merge($users);

         $allUsers->each(function ($user) {
            Task::factory()->count(5)->create([
                'user_id' => $user->id,
                'company_id' => $user->company_id
            ]);
        });
    }
}
