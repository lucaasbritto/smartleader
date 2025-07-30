<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function login(array $credentials){
        if (!$token = JWTAuth::attempt($credentials)) {
            return [
                'error' => 'Email ou senha inválidos',
                'status' => 401
            ];
        }

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()->load('company'),
        ];
    }

    public function register(array $data){
        $company = Company::create([
            'name' => $data['company_name'],
            'identifier' => $data['company_identifier'],
        ]);

        $user = User::create([
            'name'       => $data['name'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'company_id' => $company->id,
            'is_admin'   => true,
        ]);

        $token = auth()->login($user);

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user->load('company'),
        ];
    }
}
