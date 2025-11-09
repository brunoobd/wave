# WAVE - Backend API

## Sobre o Projeto

O WAVE é um aplicativo de gerenciamento de tempo baseado na técnica Pomodoro, que ajuda usuários a manterem o foco e a produtividade através de ciclos de trabalho e descanso. Este backend fornece uma API RESTful completa para autenticação de usuários e gerenciamento de tarefas.

## Funcionalidades Implementadas

- ✅ Autenticação de usuários (cadastro e login)
- ✅ Gerenciamento de perfil do usuário
- ✅ CRUD completo de tarefas
- ✅ Autenticação JWT
- ✅ Documentação automática da API (Swagger)
- ✅ Validação de dados com Zod
- ✅ Tratamento de erros padronizado

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Superset JavaScript com tipagem estática
- **Prisma** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **bcryptjs** - Hash de senhas
- **JWT** - Autenticação baseada em tokens

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrações do banco
├── src/
│   ├── http/
│   │   ├── routes/           # Rotas da API
│   │   │   ├── auth/         # Rotas de autenticação
│   │   │   └── tasks/        # Rotas de tarefas
│   │   ├── middlewares/      # Middlewares (auth, etc)
│   │   ├── error-handler.ts  # Tratamento de erros
│   │   └── server.ts         # Configuração do servidor
│   ├── lib/
│   │   └── prisma.ts         # Cliente Prisma
│   ├── utils/               # Utilitários
│   └── env.ts               # Validação de variáveis de ambiente
└── package.json
```

## Pré-requisitos

Para executar o backend em seu ambiente local, você precisará:

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**
- **PostgreSQL** (versão 12 ou superior)
- **Git**

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd wave/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:

```env
# Porta do servidor
PORT=3333

# URL do banco de dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/wave?schema=public"

# Secret para assinatura de tokens JWT
JWT_SECRET="seu-secret-jwt-super-seguro-aqui"

# URL do frontend (para CORS)
FRONTEND_URL="http://localhost:8081"
```

**⚠️ Importante:** Substitua os valores acima pelos seus próprios dados de conexão e gere um JWT_SECRET seguro.

### 4. Configure o banco de dados

Execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

### 5. Gere o cliente Prisma

```bash
npx prisma generate
```

## Executando o Projeto

### Modo Desenvolvimento

Para executar o servidor em modo desenvolvimento com hot-reload:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

### Modo Produção

Para executar o servidor em modo produção:

```bash
npm run build
npm start
```

## Documentação da API

Após iniciar o servidor, a documentação interativa da API (Swagger) estará disponível em:

```
http://localhost:3333/docs
```

A documentação inclui:

- Todas as rotas disponíveis
- Parâmetros esperados
- Exemplos de requisições e respostas
- Possibilidade de testar as rotas diretamente

## Rotas da API

### Autenticação

- `POST /users` - Criar nova conta
- `POST /sessions/password` - Autenticar com email/senha
- `GET /profile` - Obter perfil do usuário autenticado

### Tarefas

- `GET /tasks` - Listar todas as tarefas do usuário
- `GET /tasks/:id` - Obter tarefa específica
- `POST /tasks` - Criar nova tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run start` - Inicia o servidor em modo produção
- `npm run build` - Compila o TypeScript para JavaScript

## Banco de Dados

O projeto utiliza Prisma como ORM. Comandos úteis:

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Visualizar o banco de dados no Prisma Studio
npx prisma studio

# Resetar o banco de dados (cuidado: apaga todos os dados)
npx prisma migrate reset
```

## Modelo de Dados

### Diagrama ER (Entity Relationship)

```mermaid
erDiagram
    User ||--o{ Task : "possui"

    User {
        uuid id PK
        string name "nullable"
        string email UK "unique"
        string password_hash "nullable"
        datetime created_at
        datetime updated_at
    }

    Task {
        uuid id PK
        string name
        uuid user_id FK
        datetime created_at
        datetime updated_at
    }
```

### Estrutura do Banco de Dados

#### Tabela: `users`

| Campo           | Tipo      | Descrição                           | Constraints             |
| --------------- | --------- | ----------------------------------- | ----------------------- |
| `id`            | UUID      | Identificador único do usuário      | PRIMARY KEY, NOT NULL   |
| `name`          | VARCHAR   | Nome completo do usuário            | NULLABLE                |
| `email`         | VARCHAR   | Email do usuário (usado para login) | UNIQUE, NOT NULL        |
| `password_hash` | VARCHAR   | Hash da senha (bcrypt)              | NULLABLE                |
| `created_at`    | TIMESTAMP | Data e hora de criação do registro  | NOT NULL, DEFAULT NOW() |
| `updated_at`    | TIMESTAMP | Data e hora da última atualização   | NOT NULL, AUTO UPDATE   |

**Índices:**

- `PRIMARY KEY` em `id`
- `UNIQUE` em `email`

#### Tabela: `tasks`

| Campo        | Tipo      | Descrição                          | Constraints             |
| ------------ | --------- | ---------------------------------- | ----------------------- |
| `id`         | UUID      | Identificador único da tarefa      | PRIMARY KEY, NOT NULL   |
| `name`       | VARCHAR   | Nome/descrição da tarefa           | NOT NULL                |
| `user_id`    | UUID      | ID do usuário proprietário         | FOREIGN KEY, NOT NULL   |
| `created_at` | TIMESTAMP | Data e hora de criação do registro | NOT NULL, DEFAULT NOW() |
| `updated_at` | TIMESTAMP | Data e hora da última atualização  | NOT NULL, AUTO UPDATE   |

**Índices:**

- `PRIMARY KEY` em `id`
- `FOREIGN KEY` em `user_id` referenciando `users(id)` com `ON DELETE CASCADE`

**Relacionamentos:**

- Um usuário pode ter múltiplas tarefas (1:N)
- Uma tarefa pertence a um único usuário (N:1)
- Quando um usuário é deletado, todas suas tarefas são automaticamente deletadas (CASCADE)

## Segurança

- Senhas são hasheadas usando bcryptjs antes de serem armazenadas
- Autenticação baseada em JWT (JSON Web Tokens)
- Validação de dados de entrada com Zod
- CORS configurado para permitir apenas origens autorizadas
- Tratamento de erros padronizado e seguro

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.
