<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\Task\TaskService;
use App\Http\Requests\Task\TaskStoreRequest;
use App\Http\Requests\Task\TaskUpdateRequest;
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

    public function store(TaskStoreRequest $request){
         $task = $this->taskService->createTask($request->validated());
        return response()->json($task, 201);
    }


    public function update(TaskUpdateRequest $request, Task $task){
        $updatedTask = $this->taskService->updateTask($task, $request->validated());

        return response()->json($updatedTask);
    }

    public function destroy($id){
        try {
            $this->taskService->deleteTask($id);
            return response()->json(['message' => 'Tarefa excluída com sucesso.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao excluir a tarefa.'], 500);
        }
    }

    public function export(Request $request){
        $format = $request->get('format', 'xlsx');

        $this->taskService->exportTasks($format);

        return response()->json([
            'message' => 'Exportação iniciada. Você será notificado quando estiver pronta para download.'
        ]);
    }
}