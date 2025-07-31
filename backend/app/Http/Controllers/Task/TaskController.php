<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\Task\TaskService;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService){
        $this->taskService = $taskService;
    }

    public function index(Request $request){
        $perPage = $request->get('per_page', 10); 
        $page = $request->get('page', 1);

        $tasks = $this->taskService->getTasks($perPage, $page);

        return response()->json($tasks);
    }
}