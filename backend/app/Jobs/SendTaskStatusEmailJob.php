<?php

namespace App\Jobs;

use App\Mail\TaskNotificationMail;
use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendTaskStatusEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected int $taskId;
    protected string $action;

    public function __construct(int $taskId, string $action)
    {
        $this->taskId = $taskId;
        $this->action = $action;
    }

    public function handle(): void
    {
        $task = Task::with('user')->findOrFail($this->taskId);

        Mail::to($task->user->email)
            ->send(new TaskNotificationMail($task, $this->action));
    }
}
