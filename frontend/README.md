# PokéDex Admin — Frontend

Interface web da Pokédex Administrativa do Centro Pokémon, desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**.

## Funcionalidades

- Autenticação de treinadores (Login e Registro)
- Dashboard com grid de cards estilo Pokédex
- CRUD completo de Pokémons via modais
- Busca por nome, tipo ou número da Pokédex
- Sprites oficiais dos Pokémons (PokeAPI)
- Cores dinâmicas por tipo (Fogo, Água, Grama, etc.)
- Controle de ownership (apenas o criador pode editar/excluir)
- Loader animado com Pokébola e sistema de toasts
- Interface responsiva com efeitos glass-morphism

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- Backend rodando em `http://localhost:3000`

## Configuração

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`.

## Variáveis de Ambiente

| Variável              | Descrição        | Padrão                 |
| --------------------- | ---------------- | ---------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API  | `http://localhost:3000` |

Para customizar, crie um arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com providers
│   ├── page.tsx            # Redirect inicial
│   ├── globals.css         # Estilos globais e tema Pokédex
│   ├── login/page.tsx      # Página de login
│   ├── register/page.tsx   # Página de registro
│   └── dashboard/page.tsx  # Pokédex administrativa
├── components/
│   ├── PokemonCard.tsx     # Card do Pokémon com sprite e stats
│   ├── PokemonForm.tsx     # Modal de criação/edição
│   ├── DeleteModal.tsx     # Modal de confirmação de exclusão
│   ├── PokeballLoader.tsx  # Loader animado
│   └── Toast.tsx           # Sistema de notificações
├── contexts/
│   └── AuthContext.tsx     # Provider de autenticação JWT
├── lib/
│   ├── api.ts              # Serviço Axios com interceptor
│   └── pokemon-types.ts    # Mapa de cores por tipo
└── types/
    └── index.ts            # Interfaces TypeScript
```

## Scripts

| Comando         | Descrição                         |
| --------------- | --------------------------------- |
| `npm run dev`   | Inicia em modo de desenvolvimento |
| `npm run build` | Compila o projeto                 |
| `npm run start` | Inicia em modo de produção        |
| `npm run lint`  | Executa o linter                  |
