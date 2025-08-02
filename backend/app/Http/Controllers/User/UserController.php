<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\UserStoreRequest;
use App\Services\User\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function index(Request $request){
        $companyId = auth()->user()->company_id;

        $perPage = $request->query('per_page', 10);

        $users = $this->userService->listUsers($companyId, $perPage);

        return response()->json($users);
    }

    public function store(UserStoreRequest $request){
        $companyId = auth()->user()->company_id;

        $response = $this->userService->createUser($request->validated(), $companyId);

        return response()->json($response);
    }
}
