<?php

namespace App\Exports;

use App\Models\Task;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TasksExport implements FromCollection, WithHeadings, WithMapping
{
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function collection()
    {
        return Task::where('user_id', $this->userId)->get();
    }

    public function headings(): array
    {
        return [
            'Título',
            'Descrição',
            'Status',
            'Prioridade',
            'Prazo',
        ];
    }

    public function map($task): array
    {
        return [
            $task->title,
            $task->description,
            ucfirst($task->status),
            ucfirst($task->priority),
            optional($task->deadline)->format('d/m/Y'),
        ];
    }
}
