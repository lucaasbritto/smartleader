<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserStoreRequest;
use App\Services\User\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function store(UserStoreRequest $request){
        $companyId = auth()->user()->company_id;

        $response = $this->userService->createUser($request->validated(), $companyId);

        return response()->json($response);
    }
}
