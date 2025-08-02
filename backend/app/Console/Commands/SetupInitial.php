<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SetupInitial extends Command
{
    protected $signature = 'setup:init';

    protected $description = 'Cria a primeira empresa e o primeiro usuário admin de forma interativa';

    public function handle()
    {
        $this->info('Iniciando configuração inicial...');
        $companyName = $this->ask('Nome da Empresa');
        

        do {
            $companyId = $this->ask('Identificação da Empresa (ex: CNPJ ou código interno)');

            if (Company::where('identifier', $companyId)->exists()) {
                $this->error('Já existe uma empresa com esse identificador. Tente outro.');
            } else {
                break;
            }
        } while (true);
        
        $userName = $this->ask('Nome do usuário administrador');

        do {
            $userEmail = $this->ask('Email do usuário administrador');        

            if (User::where('email', $userEmail)->exists()) {
                $this->error('Já existe um usuário com esse e-mail. Tente outro.');
            } else {
                break;
            }
        } while (true);

        
        if (User::where('email', $userEmail)->exists()) {
            $this->error('Já existe um usuário com este e-mail.');
            return;
        }

        $userPassword = $this->secret('Senha');


        DB::transaction(function () use (
            $companyName, $companyId,
            $userName, $userEmail, $userPassword
        ) {
            $company = Company::create([
                'name' => $companyName,
                'identifier' => $companyId,
            ]);

            User::create([
                'name' => $userName,
                'email' => $userEmail,
                'password' => bcrypt($userPassword),
                'company_id' => $company->id,
                'is_admin' => '1',
            ]);
        });

        $this->info('Empresa e usuário administrador criados com sucesso!');
        }
}
