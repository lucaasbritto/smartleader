<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Events\TaskStatus;
use App\Jobs\ExportTasksJob;

class TaskService{
    public function getTasks(int $perPage = 10, int $page = 1)
    {
        $user = Auth::user();
        $request = request();

        $query = Task::where('company_id', $user->company_id);

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('date')) {
            $query->whereDate('deadline', $request->date);
        }

        return $query->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function createTask(array $data){
        $user = Auth::user();

        $task = Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'status' => $data['status'],
            'priority' => $data['priority'],
            'deadline' => $data['deadline'] ?? null,
            'user_id' => $user->id,
            'company_id' => $user->company_id,
        ]);

        event(new TaskStatus($task, 'criada'));

        return $task;
    }

    public function updateTask(Task $task, array $data){
        $oldStatus = $task->status;

        $task->update($data);

        if ($oldStatus !== 'concluída' && $task->status === 'concluída') {
            event(new TaskStatus($task, 'concluída'));
        }

        return $task;
    }

    public function deleteTask($id){
        $task = Task::findOrFail($id);
        $task->delete();
    }

    public function exportTasks(string $format = 'xlsx'){
        $user = Auth::user();
        ExportTasksJob::dispatch($user->id, $format);
    }
    
}
