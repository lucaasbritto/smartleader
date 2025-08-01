@php
    $statusColors = [
        'concluída' => '#4caf50',
        'em andamento' => '#2196f3',
        'pendente' => '#9e9e9e',
    ];

    $priorityColors = [
        'baixa' => '#64b5f6',
        'média' => '#ffc107',
        'alta' => '#ef5350',
    ];
    $statusColor    = $statusColors[strtolower($task->status)] ?? '#9E9E9E';
    $priorityColor = $priorityColors[strtolower($task->priority)] ?? '#9E9E9E';
@endphp

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Tarefa {{ $action }}</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 30px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              
        <h2 style="color: #4CAF50; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; text-align: center;">
            Tarefa {{ $action }}
        </h2>

        <p><strong style="color:#555;">Título:</strong> {{ $task->title }}</p>

        <p>
            <strong style="color:#555;">Prioridade:</strong>
            <span style="color: {{ $priorityColor }}; font-weight: bold;">{{ ucfirst($task->priority) }}</span>
        </p>

        <p>
            <strong style="color:#555;">Status:</strong> 
            <span style="color: {{ $statusColor }}; font-weight: bold;">{{ ucfirst($task->status) }}</span>
        </p>

        <p><strong style="color:#555;">Data:</strong> {{ \Carbon\Carbon::parse($task->deadline)->format('d/m/Y') }}</p>

        <p><strong style="color:#555;">Descrição:</strong></p>
        <div style="background-color: #f0f0f0; padding: 10px 15px; border-radius: 6px; white-space: pre-line;">
            {{ $task->description }}
        </div>

        <p style="margin-top: 30px; font-size: 13px; color: #888; text-align: center;">
            Este é um e-mail automático enviado pelo sistema de tarefas <strong>SmartLeader</strong>.
        </p>
    </div>
</body>
</html>
