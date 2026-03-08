# Desafio Simulação de Integração — Pokémon Center

Sistema de controle para um Centro Pokémon (Pokédex Administrativa) com backend em NestJS e frontend em Next.js.

## Visão Geral

O projeto é uma aplicação fullstack onde treinadores podem se cadastrar, autenticar e gerenciar Pokémons em uma Pokédex compartilhada. Cada treinador só pode editar ou excluir os Pokémons que ele próprio registrou.

## Tecnologias

| Camada   | Stack                                          |
| -------- | ---------------------------------------------- |
| Backend  | NestJS, TypeScript, PostgreSQL, TypeORM, JWT   |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Zod  |
| Banco    | PostgreSQL 16 (via Docker)                     |

## Estrutura do Repositório

```
├── backend/       # API RESTful (NestJS)
├── frontend/      # Interface web (Next.js)
└── README.md
```

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) e Docker Compose

### 1. Banco de Dados

```bash
cd backend
cp .env.example .env
docker compose up -d
```

### 2. Backend

```bash
cd backend
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`.

## Funcionalidades

- **Autenticação:** Cadastro e login de treinadores com JWT
- **Pokédex Global:** Listagem de todos os Pokémons cadastrados por qualquer treinador
- **CRUD de Pokémons:** Criar, visualizar, editar e excluir registros
- **Controle de Ownership:** Apenas o treinador que criou o Pokémon pode editá-lo ou excluí-lo
- **Busca e Filtro:** Pesquisa por nome, tipo ou número da Pokédex
- **UI Imersiva:** Interface temática com sprites oficiais, cores por tipo e animações

## Endpoints da API

| Método | Rota             | Descrição                | Auth |
| ------ | ---------------- | ------------------------ | ---- |
| POST   | `/auth/register` | Cadastro de treinador    | Não  |
| POST   | `/auth/login`    | Login                    | Não  |
| GET    | `/pokemons`      | Listar todos os Pokémons | JWT  |
| GET    | `/pokemons/:id`  | Buscar Pokémon por ID    | JWT  |
| POST   | `/pokemons`      | Criar novo Pokémon       | JWT  |
| PATCH  | `/pokemons/:id`  | Atualizar Pokémon        | JWT  |
| DELETE | `/pokemons/:id`  | Remover Pokémon          | JWT  |

## Documentação Específica

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)
