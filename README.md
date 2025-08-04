# Sistema de Pedidos 

Aplicação completa para gerenciamento de tarefas com suporte a múltiplas empresas (multitenancy), autenticação JWT, notificações por e-mail, interface Vue.js. e execução em ambiente **Docker**

---

## Tecnologias utilizadas

### Backend
- Laravel 8
- JWT Auth (`tymon/jwt-auth`)
- MySQL
- Filas com driver de banco de dados
- Eventos, Listeners e Job para e-mail
- Command


### Frontend
- Vue.js 2 Quasar Framework
- Vuex
- Vue Router
- Axios
- Quasar Framework

### Infraestrutura
- Docker + Docker-compose
- Nginx


## Funcionalidades

- Login, registro e logout com JWT
- CRUD completo de tarefas e paginação
- Filtros por titulo, descrição, status, prioridade e data
- Inserção, Edição, Visualização, Exclusão de tarefas (somente admins)
- Controle de permissões (usuário/admin)
- Exportação de tarefas para CSV e Excel
- Envio de e-mails ao criar ou concluir tarefas
- Fila assíncrona para envio de e-mails com driver database
- Ambiente completo com docker-compose
- Containers para app, banco de dados e nginx
- Tela de usuario para cadastrar e listar (Apenas Admin tem acesso)
- Tela de download de exportação

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker instalado]
- [Docker Compose instalado]

---


## Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/lucaasbritto/smartleader.git
cd smartleader
```

2. **Copie o arquivo de ambiente para produção**
```bash
  cp app/.env.example app/.env
```

3. **Configure o nome do banco em .env**
```env
DB_DATABASE=laravel
```

4. **Suba os containers com Docker**
```shell
  docker-compose up --build -d
```

5. **Entre no container**
```shell
  docker exec -it laravel_app_smart bash
```
6. **Instale as dependências do PHP**
```shell
  composer install
```

7. **Gere a chave da aplicação**
```shell
  php artisan key:generate
```

8. **Gere a chave JWT**
```shell
  php artisan jwt:secret
```

9. **Crie a tabela dos jobs**
```shell
  php artisan queue:table
```

10. **Rode as migrações e os seeders**
```shell
  php artisan migrate --seed
```

11. **Cadastre a sua empresa e Usuario Admin**
```shell
  php artisan setup:initial
```

```md
12. **O serviço de fila já é iniciado automaticamente via Docker**
- Não é necessário rodar `php artisan queue:work` manualmente.
- As filas são executadas em um container separado (`queue`) configurado no `docker-compose.yml`.
```

13. **Os Seeders criam**
  - 1 empresa
  - 1 admin
  - 4 usuários
  - Tarefas


## Acessos
  - Front-end: http://localhost:5173
  - Back-end (API): http://localhost:8080/api


## Usuários para acesso do sistema (Criado Via Seeder)
| Tipo    | Email                            | Senha                      |
|---------|----------------------------------|----------------------------|
| Admin   | admin@teste.com                  | 123456                     |
| Usuario | user@teste.com                   | 123456                     |

## OBS: Se voce criou a empresa no setup inicial pode usar a senha que criou



## Variáveis obrigatórias no .env

```env
APP_NAME=Laravel
APP_KEY=           # Gerado via php artisan key:generate
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
QUEUE_CONNECTION=database
JWT_SECRET=        # Gerado via php artisan jwt:secret
```
- (Essas informações do banco estão pre configuradas no Docker)

## Envio do email
- Foi criado uma conta teste no mailtrap para realizar o funcionamento dos envios e a configuração vai esta no .env


## Endpoints principais

| Método | Rota                         | Ação                                          |
|--------|------------------------------|-----------------------------------------------|
| POST   | /api/login                   | Login e geração de token JWT                  |
| POST   | /api/register                | Registra novo usuario(admin) e uma empresa    |
| GET    | /api/me                      | Retorna o usuário autenticado                 |
| GET    | /api/task                    | Lista tarefas (com filtros)                   |
| POST   | /api/task/                   | Cria uma nova tarefa                          |
| PATCH  | /api/task/{id}/status        | Atualiza o status da tarefa                   |
| PUT    | /api/task/                   | Atualiza a tarefa                             |
| DELETE | /api/{id}                    | Deleta uma tarefa                             |
| GET    | /api/users                   | Lista todos os usuários(So admin tem acesso)  |
| POST   | /api/users                   | Cadastra um novo usuario(So admin tem acesso) |
| GET    | /api/exports                 | Lista todas as exportações                    |
| POST   | /api/exports                 | Faz a exportação do arquivo                   |
| GET    | /api/exports                 | Executa o download do arquivo                 |

##  Comandos úteis

- Parar containers: `docker-compose down`
- Subir containers: `docker-compose up --build -d`
- Acessar o container: `docker exec -it laravel_app_smart bash`
- Rodar seeders novamente: `php artisan migrate:fresh --seed`