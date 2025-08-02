<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function listUsers(int $companyId, int $perPage = 10){
        return User::where('company_id', $companyId)
            ->select('id', 'name', 'email', 'is_admin', 'created_at')
            ->paginate($perPage);
    }

    public function createUser(array $data, int $companyId){
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => $data['is_admin'] ?? false,
            'company_id' => $companyId
        ]);
    }
}
