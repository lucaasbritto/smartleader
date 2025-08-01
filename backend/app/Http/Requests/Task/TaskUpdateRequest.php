<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status'      => 'required|string|in:pendente,em andamento,concluída',
            'priority'    => 'required|string|in:baixa,média,alta',
            'deadline'    => 'required|date',   
        ];
    }

    public function messages()
    {
        return [
            'title.required'          => 'O Titulo é obrigatório.',
            'description.required'    => 'A Descrição é obrigatória.',
            'deadline.required'       => 'A Data Limite é obrigatória.',
            'status.required'         => 'O Status é Obrigatório',
            'priority.required'       => 'A Prioridade é Obrigatória',
        ];
    }
}
