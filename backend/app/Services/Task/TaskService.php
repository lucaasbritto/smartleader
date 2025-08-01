<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService{
    public function getTasks(int $perPage = 10, int $page = 1)
    {
       $user = Auth::user();

        return Task::where('company_id', $user->company_id)
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function createTask(array $data){
        $user = Auth::user();

        return Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'status' => $data['status'],
            'priority' => $data['priority'],
            'deadline' => $data['deadline'] ?? null,
            'user_id' => $user->id,
            'company_id' => $user->company_id,
        ]);
    }
}
