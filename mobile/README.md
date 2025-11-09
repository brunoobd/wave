# Pomo - Mobile App

## Sobre o Projeto

O Pomo é um aplicativo mobile de gerenciamento de tempo baseado na técnica Pomodoro, desenvolvido com React Native e Expo. O aplicativo ajuda usuários a manterem o foco e a produtividade através de ciclos de trabalho e descanso, permitindo que organizem suas tarefas e acompanhem seu progresso.

## Funcionalidades Implementadas

- ✅ Autenticação de usuários (cadastro e login)
- ✅ Timer Pomodoro configurável (Pomodoro, Pausa Curta, Pausa Longa)
- ✅ Edição de tempo do timer
- ✅ Gerenciamento de tarefas (criar, listar, deletar)
- ✅ Seleção de tarefas durante o timer
- ✅ Música de fundo durante o timer (Ondas, Chuva, Floresta)
- ✅ Controle de áudio (mute/unmute)
- ✅ Tela de configurações
- ✅ Persistência de dados local
- ✅ Navegação entre telas com transições suaves
- ✅ Interface moderna com gradientes e animações

## Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma e ferramentas para React Native
- **TypeScript** - Superset JavaScript com tipagem estática
- **React Navigation** - Navegação entre telas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Expo Secure Store** - Armazenamento seguro de tokens
- **Expo Linear Gradient** - Gradientes visuais
- **Expo Audio** - Reprodução de áudio

## Estrutura do Projeto

```
mobile/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── GradientBackground.tsx
│   │   ├── TimerDisplay.tsx
│   │   ├── TimerControls.tsx
│   │   ├── ModeSelector.tsx
│   │   └── TaskSelect.tsx
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.tsx
│   │   ├── PomodoroContext.tsx
│   │   └── BackgroundMusicContext.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── usePomodoro.ts
│   │   ├── useTasks.ts
│   │   ├── useBackgroundMusic.ts
│   │   ├── useIsSignedIn.ts
│   │   └── useIsSignedOut.ts
│   ├── routes/              # Configuração de rotas
│   │   └── index.tsx
│   ├── screens/             # Telas da aplicação
│   │   ├── Splash.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── Home.tsx
│   │   └── Settings.tsx
│   ├── services/            # Serviços de API
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   └── task.service.ts
│   ├── schemas/             # Schemas de validação (Zod)
│   │   ├── auth.schema.ts
│   │   └── task.schema.ts
│   ├── types/               # Definições de tipos TypeScript
│   │   ├── auth.types.ts
│   │   └── task.types.ts
│   └── utils/               # Utilitários
│       └── storage.ts
├── assets/                   # Imagens, ícones, sons
│   └── sounds/              # Arquivos de áudio
│       ├── forest.mp3
│       ├── rain.mp3
│       └── waves.mp3
├── App.tsx                   # Componente raiz
├── app.json                  # Configuração do Expo
└── package.json              # Dependências do projeto
```

## Pré-requisitos

Para executar o aplicativo mobile em seu ambiente local, você precisará:

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**
- **Expo CLI** (instalado globalmente ou via npx)
- **Git**
- **Dispositivo móvel** ou **Emulador/Simulador**
  - Android Studio (para Android)
  - Xcode (para iOS - apenas macOS)

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd pomo/mobile
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `mobile` (opcional):

```env
# URL da API backend
EXPO_PUBLIC_API_URL=http://localhost:3333
```

**Nota:** Se não configurar, o app usará `http://localhost:3333` como padrão. Para dispositivos físicos ou emuladores Android, você precisará usar o IP da sua máquina na rede local.

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

Isso abrirá o Expo DevTools no navegador. Você pode:

- Pressionar `a` para abrir no emulador Android
- Pressionar `i` para abrir no simulador iOS (apenas macOS)
- Escanear o QR code com o app Expo Go no seu dispositivo físico

## Executando o Projeto

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm start

# Abre diretamente no Android
npm run android

# Abre diretamente no iOS (apenas macOS)
npm run ios

# Abre no navegador web
npm run web
```

### Build para Produção

Para gerar um build de produção, você precisará de uma conta Expo e do EAS CLI:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login no Expo
eas login

# Configurar o projeto (primeira vez)
eas build:configure

# Build para Android
eas build --platform android

# Build para iOS (apenas macOS)
eas build --platform ios

# Build para ambas as plataformas
eas build --platform all
```

**Nota:** Os comandos `expo build` estão deprecated. Use `eas build` para builds de produção.

## Configuração para Dispositivos Físicos

### Android Emulator

O app detecta automaticamente e usa `http://10.0.2.2:3333` para acessar o localhost da máquina host.

### iOS Simulator

O app usa `http://localhost:3333` automaticamente.

### Dispositivo Físico

1. Descubra o IP da sua máquina na rede local:

   - Windows: `ipconfig`
   - macOS/Linux: `ifconfig` ou `ip addr`

2. Configure a variável de ambiente:

   ```env
   EXPO_PUBLIC_API_URL=http://SEU_IP:3333
   ```

3. Certifique-se de que o backend está acessível na rede local (não apenas localhost)

## Funcionalidades Principais

### Timer Pomodoro

- **Modos disponíveis:**

  - Pomodoro (25 minutos padrão)
  - Pausa Curta (5 minutos padrão)
  - Pausa Longa (15 minutos padrão)

- **Controles:**
  - Iniciar/Pausar timer
  - Resetar timer
  - Editar tempo manualmente (toque no display)

### Gerenciamento de Tarefas

- Criar novas tarefas
- Listar tarefas do usuário
- Selecionar tarefa durante o timer
- Atualizar tarefas
- Deletar tarefas

### Autenticação

- Cadastro de novos usuários
- Login com email e senha
- Logout
- Persistência de sessão com Expo Secure Store

### Música de Fundo

- Reprodução automática durante o timer ativo
- Opções disponíveis:
  - Ondas
  - Chuva
  - Floresta
  - Nenhuma
- Controle de volume (mute/unmute)
- Persistência da preferência do usuário

### Configurações

- Visualização de informações do usuário
- Controle de áudio (ligar/desligar)
- Seleção de música de fundo
- Logout da aplicação

## Estrutura de Telas

### Splash Screen

Tela inicial que verifica se o usuário está autenticado.

### Sign In / Sign Up

Telas de autenticação com validação de formulários.

### Home

Tela principal com:

- Timer Pomodoro
- Seletor de modo (Pomodoro/Pausa Curta/Pausa Longa)
- Seletor de tarefas
- Controles do timer (Iniciar/Pausar/Resetar)
- Botão de configurações
- Controle de áudio (mute/unmute)

### Settings

Tela de configurações com:

- Informações do usuário (nome e email)
- Controle de áudio (ligar/desligar)
- Seleção de música de fundo
- Botão de logout

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Abre no emulador Android
- `npm run ios` - Abre no simulador iOS
- `npm run web` - Abre no navegador web

## Arquitetura e Padrões

### Navegação

O app utiliza `React Navigation` com `Native Stack Navigator`. A navegação é condicional baseada no estado de autenticação:

- **Não autenticado:** Splash → SignIn/SignUp
- **Autenticado:** Home ↔ Settings

O `GradientBackground` envolve o `NavigationContainer` para evitar o "flash branco" durante as transições de tela.

### Contextos

O app utiliza três contextos principais:

- **AuthContext:** Gerencia autenticação, sessão e estado do usuário
- **PomodoroContext:** Gerencia o estado do timer (modo, tempo, execução)
- **BackgroundMusicContext:** Gerencia a reprodução de música de fundo

### Custom Hooks

Hooks personalizados para facilitar o uso dos contextos:

- `useAuth()` - Acesso ao contexto de autenticação
- `usePomodoro()` - Acesso ao contexto do Pomodoro
- `useTasks()` - Gerenciamento de tarefas
- `useBackgroundMusic()` - Controle de música de fundo
- `useIsSignedIn()` - Verifica se o usuário está autenticado
- `useIsSignedOut()` - Verifica se o usuário não está autenticado

### Componentes Principais

- **GradientBackground:** Componente de fundo com gradiente, usado no nível superior para evitar flashes brancos
- **TimerDisplay:** Exibe o tempo restante do timer
- **TimerControls:** Botões de controle do timer (Iniciar/Pausar/Resetar)
- **ModeSelector:** Seletor de modo (Pomodoro/Pausa)
- **TaskSelect:** Seletor e gerenciador de tarefas
- **Button:** Botão reutilizável com estados de loading
- **Input:** Input reutilizável com validação e mensagens de erro

## Desenvolvimento

### Adicionar Novas Telas

1. Crie o componente da tela em `src/screens/`
2. Adicione a rota em `src/routes/index.tsx`
3. Configure a navegação conforme necessário (autenticado/não autenticado)

### Adicionar Novos Componentes

Componentes reutilizáveis devem ser criados em `src/components/` e seguir os padrões de estilo existentes. Use TypeScript para tipagem e mantenha os componentes puros quando possível.

### Integração com API

Os serviços de API estão em `src/services/`:

- `api.ts` - Cliente HTTP base com interceptors para autenticação
- `auth.service.ts` - Serviços de autenticação (login, signup, logout)
- `task.service.ts` - Serviços de tarefas (CRUD)

### Validação de Dados

O app utiliza **Zod** para validação de schemas:

- `src/schemas/auth.schema.ts` - Validação de formulários de autenticação
- `src/schemas/task.schema.ts` - Validação de tarefas

### Tipos TypeScript

Os tipos estão definidos em `src/types/`:

- `auth.types.ts` - Tipos relacionados à autenticação
- `task.types.ts` - Tipos relacionados às tarefas

## Troubleshooting

### Erro de conexão com a API

- Verifique se o backend está rodando
- Confirme a URL da API nas variáveis de ambiente
- Para dispositivos físicos, use o IP da máquina, não localhost
- Verifique se o firewall não está bloqueando a porta

### Problemas com dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
```

### Problemas com Expo

```bash
# Limpar cache do Expo
npx expo start -c

# Limpar cache do Metro bundler
npx expo start --clear
```

### Problemas com Gradiente/Transições

O `GradientBackground` está configurado no nível superior das rotas para evitar flashes brancos. Se você estiver vendo flashes, verifique se:

- O `GradientBackground` está envolvendo o `NavigationContainer` em `src/routes/index.tsx`
- As telas não estão usando `GradientBackground` individualmente (exceto quando necessário)
- O componente está usando `useScrollView={false}` quando envolve o NavigationContainer

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.
