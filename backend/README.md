# Pokemon Center API

API RESTful para gerenciamento de Pokémons, desenvolvida com **NestJS**, **TypeScript** e **PostgreSQL**.

## Funcionalidades

- CRUD completo de Pokémons (Nome, Tipo, Nível, HP, Número da Pokédex)
- Autenticação JWT (Cadastro e Login)
- Proteção de rotas com Guards
- Validação de dados com class-validator

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) e Docker Compose

## Configuração

1. Clone o repositório e acesse a pasta do backend:

```bash
cd backend
```

2. Copie o arquivo de variáveis de ambiente e ajuste se necessário:

```bash
cp .env.example .env
```

3. Suba o banco de dados PostgreSQL com Docker:

```bash
docker compose up -d
```

4. Instale as dependências:

```bash
npm install
```

5. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## Variáveis de Ambiente

| Variável         | Descrição                     | Padrão                                  |
| ---------------- | ----------------------------- | --------------------------------------- |
| `DB_HOST`        | Host do PostgreSQL            | `localhost`                             |
| `DB_PORT`        | Porta do PostgreSQL           | `5432`                                  |
| `DB_USERNAME`    | Usuário do banco              | `postgres`                              |
| `DB_PASSWORD`    | Senha do banco                | `postgres`                              |
| `DB_NAME`        | Nome do banco de dados        | `pokemon_center`                        |
| `JWT_SECRET`     | Chave secreta para tokens JWT | `super-secret-key-change-in-production` |
| `JWT_EXPIRATION` | Tempo de expiração do token   | `1d`                                    |
| `PORT`           | Porta da API                  | `3000`                                  |
| `FRONTEND_URL`   | URL do frontend (CORS)        | `http://localhost:3001`                 |

## Endpoints

### Autenticação

| Método | Rota             | Descrição        | Autenticação |
| ------ | ---------------- | ---------------- | ------------ |
| POST   | `/auth/register` | Cadastro         | Não          |
| POST   | `/auth/login`    | Login            | Não          |

### Pokémons

| Método | Rota             | Descrição                | Autenticação |
| ------ | ---------------- | ------------------------ | ------------ |
| GET    | `/pokemons`      | Listar todos os Pokémons | JWT          |
| GET    | `/pokemons/:id`  | Buscar Pokémon por ID    | JWT          |
| POST   | `/pokemons`      | Criar novo Pokémon       | JWT          |
| PATCH  | `/pokemons/:id`  | Atualizar Pokémon        | JWT          |
| DELETE | `/pokemons/:id`  | Remover Pokémon          | JWT          |

### Exemplos de Requisição

**Cadastro:**
```json
POST /auth/register
{
  "name": "Ash",
  "email": "ash@pokemon.com",
  "password": "123456"
}
```

**Login:**
```json
POST /auth/login
{
  "email": "ash@pokemon.com",
  "password": "123456"
}
```

**Criar Pokémon** (requer header `Authorization: Bearer <token>`):
```json
POST /pokemons
{
  "name": "Pikachu",
  "type": "Elétrico",
  "level": 25,
  "hp": 35,
  "pokedexNumber": 25
}
```

## Scripts

| Comando              | Descrição                          |
| -------------------- | ---------------------------------- |
| `npm run start:dev`  | Inicia em modo de desenvolvimento  |
| `npm run build`      | Compila o projeto                  |
| `npm run start:prod` | Inicia em modo de produção         |
| `npm run lint`       | Executa o linter                   |
| `npm run test`       | Executa os testes                  |
| `npm run test:e2e`   | Executa os testes end-to-end       |

## Docker

O `docker-compose.yml` sobe apenas o banco de dados PostgreSQL. Para gerenciar:

```bash
# Iniciar o banco
docker compose up -d

# Parar o banco
docker compose down

# Parar e remover os dados
docker compose down -v
```
