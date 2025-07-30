<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'company_name' => 'required|string|max:255|unique:companies,name',
            'company_identifier' => 'required|string|max:255|unique:companies,identifier',
        ];
    }

    public function messages(){
        return [
            'name.required' => 'O nome é obrigatório.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email deve ser válido.',
            'email.unique' => 'Este email já está cadastrado.',
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senha deve ter no mínimo :min caracteres.',
            'password.confirmed' => 'A confirmação da senha não confere.',
            'company_name.required' => 'O nome da empresa é obrigatório.',
            'company_name.unique' => 'Este nome de empresa já está cadastrado.',
            'company_identifier.required' => 'O CNPJ é obrigatório.',
            'company_identifier.unique' => 'Este CNPJ já está cadastrado.',        
        ];
    }
}
