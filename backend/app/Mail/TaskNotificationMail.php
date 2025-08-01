<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TaskNotificationMail extends Mailable{
    use Queueable, SerializesModels;

    public $task;
    public $action;

    public function __construct($task, $action)
    {
       $this->task = $task;
        $this->action = $action;
    }

    
    public function build()
    {
        return $this->subject("Tarefa {$this->action}")
                    ->view('emails.task_notification');
    }
}
