# WAVE - Aplicativo de Gerenciamento de Tempo

## Sobre o Projeto

O Pomo é um aplicativo completo de gerenciamento de tempo baseado na técnica Pomodoro, desenvolvido como projeto integrador. O sistema ajuda usuários a manterem o foco e a produtividade através de ciclos de trabalho e descanso, permitindo que organizem suas tarefas e acompanhem seu progresso de forma eficiente.

O projeto é composto por uma API RESTful robusta no backend e um aplicativo mobile moderno no frontend, conectando produtores de conteúdo (ou qualquer usuário) diretamente à ferramenta de produtividade.

## Funcionalidades Implementadas

- ✅ Autenticação completa de usuários (cadastro e login)
- ✅ Timer Pomodoro configurável (Pomodoro, Pausa Curta, Pausa Longa)
- ✅ Edição de tempo do timer em tempo real
- ✅ Gerenciamento completo de tarefas (CRUD)
- ✅ Seleção de tarefas durante o timer
- ✅ Música de fundo durante o timer
- ✅ Persistência de dados local e remota
- ✅ Interface moderna com gradientes e animações
- ✅ Documentação automática da API (Swagger)

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

```
wave/
├── backend/         # API RESTful desenvolvida com Node.js e Fastify
├── mobile/          # Aplicativo mobile desenvolvido com React Native e Expo
└── README.md        # Este arquivo
```

### Backend

API RESTful desenvolvida com Node.js e Fastify, utilizando PostgreSQL como banco de dados.

**Tecnologias:**

- Node.js + TypeScript
- Fastify (Framework web)
- Prisma (ORM)
- PostgreSQL
- JWT (Autenticação)
- Zod (Validação)
- Swagger (Documentação)

### Frontend (Mobile)

Interface de usuário desenvolvida com React Native, TypeScript e Expo.

**Tecnologias:**

- React Native
- Expo
- TypeScript
- React Navigation
- React Hook Form
- Expo Secure Store
- Expo Linear Gradient

## Pré-requisitos para Execução Local

Para executar o projeto completo em seu ambiente local, você precisará:

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**
- **PostgreSQL** (versão 12 ou superior)
- **Git**
- **Expo CLI** (para o mobile - pode usar npx)
- **Dispositivo móvel** ou **Emulador/Simulador** (opcional, para testar o app mobile)

## Guia Rápido de Instalação

### 1. Clone este repositório

```bash
git clone <url-do-repositorio>
cd wave
```

### 2. Configure e inicie o backend

```bash
cd backend
npm install

# Configure o arquivo .env (veja o README do backend)
# Crie um arquivo .env com:
# PORT=3333
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/wave?schema=public"
# JWT_SECRET="seu-secret-jwt-super-seguro"
# FRONTEND_URL="http://localhost:8081"

# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

O backend estará disponível em `http://localhost:3333`
A documentação da API (Swagger) estará em `http://localhost:3333/docs`

### 3. Configure e inicie o frontend (mobile)

```bash
cd mobile
npm install

# Configure o arquivo .env (opcional)
# EXPO_PUBLIC_API_URL=http://localhost:3333

# Inicie o servidor de desenvolvimento
npm start
```

Siga as instruções no terminal para abrir no emulador ou dispositivo físico.

## Instruções Detalhadas

Para instruções detalhadas sobre a configuração de cada componente, consulte os READMEs específicos:

- **[Instruções do Backend](./backend/README.md)** - Configuração completa da API, banco de dados, variáveis de ambiente e rotas disponíveis
- **[Instruções do Mobile](./mobile/README.md)** - Configuração do aplicativo mobile, emuladores, dispositivos físicos e troubleshooting

## Estrutura de Pastas

```
wave/
├── backend/
│   ├── prisma/              # Schema e migrações do banco de dados
│   ├── src/
│   │   ├── http/            # Rotas, middlewares e servidor
│   │   ├── lib/             # Bibliotecas e configurações
│   │   └── utils/           # Utilitários
│   └── package.json
├── mobile/
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── contexts/    # Contextos React
│   │   ├── hooks/       # Custom hooks
│   │   ├── routes/      # Configuração de rotas
│   │   ├── screens/     # Telas da aplicação
│   │   ├── services/    # Serviços de API
│   │   └── utils/       # Utilitários
│   ├── assets/          # Imagens, ícones, sons
│   └── package.json
└── README.md
```

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

**Documentação completa:** `http://localhost:3333/docs`

## Funcionalidades do Aplicativo

### Timer Pomodoro

- **Modos disponíveis:**
  - Pomodoro (25 minutos padrão, editável)
  - Pausa Curta (5 minutos padrão, editável)
  - Pausa Longa (15 minutos padrão, editável)
- **Controles:** Iniciar, Pausar, Resetar
- **Edição:** Toque no display para editar o tempo manualmente

### Gerenciamento de Tarefas

- Criar, listar, atualizar e deletar tarefas
- Selecionar tarefa durante o timer
- Sincronização com o backend

### Autenticação

- Cadastro e login de usuários
- Persistência de sessão
- Logout seguro

## Scripts Principais

### Backend

```bash
cd backend
npm run dev      # Modo desenvolvimento
npm run start    # Modo produção
npm run build    # Compilar TypeScript
```

### Mobile

```bash
cd mobile
npm start        # Iniciar servidor Expo
npm run android  # Abrir no Android
npm run ios      # Abrir no iOS
npm run web      # Abrir no navegador
```

## Configuração para Dispositivos Físicos

### Android Emulator

O app detecta automaticamente e usa `http://10.0.2.2:3333`

### iOS Simulator

O app usa `http://localhost:3333` automaticamente

### Dispositivo Físico

1. Descubra o IP da sua máquina na rede local
2. Configure `EXPO_PUBLIC_API_URL=http://SEU_IP:3333` no `.env` do mobile
3. Certifique-se de que o backend está acessível na rede local

## Tecnologias Utilizadas

### Backend

- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT
- Zod
- bcryptjs
- Swagger/OpenAPI

### Frontend

- React Native
- Expo
- TypeScript
- React Navigation
- React Hook Form
- Expo Secure Store
- Expo Linear Gradient
- Expo Audio

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.

## Autores
- Bruno Barbosa Duarte
- Nicolas Nascimento Barrozo da Silva
- Edna Souza Salgado 

Desenvolvido como projeto integrador.

---

Para mais informações, consulte os READMEs específicos:

- [Backend README](./backend/README.md)
- [Mobile README](./mobile/README.md)
