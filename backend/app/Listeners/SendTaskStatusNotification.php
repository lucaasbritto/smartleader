<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\TaskStatus;
use App\Jobs\SendTaskStatusEmailJob;

class SendTaskStatusNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct()
    {
        //
    }


    public function handle(TaskStatus $event){
        dispatch(new SendTaskStatusEmailJob($event->task->id, $event->action));
    }
}
