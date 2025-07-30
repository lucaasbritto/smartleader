<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }


    public function login(LoginRequest $request){        
        $response = $this->authService->login($request->validated());
        
        if (isset($response['error'])) {
            return response()->json(['error' => $response['error']], $response['status']);
        }

        return response()->json($response);
    }


    public function register(RegisterRequest $request){
        $response = $this->authService->register($request->validated());

        return response()->json($response);
    }

    public function me(Request $request)
    {
        return response()->json(auth('api')->user());
    }
}
