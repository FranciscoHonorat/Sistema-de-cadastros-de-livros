# Biblioteca IFPB — API

API RESTful para gerenciamento de livros, usuários, empréstimos e multas da Biblioteca do IFPB.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Servidor](#executando-o-servidor)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
  - [Autenticação](#autenticação)
  - [Usuários / Perfil](#usuários--perfil)
  - [Livros](#livros)
  - [Empréstimos](#empréstimos)
  - [Administração](#administração)
- [Autenticação JWT](#autenticação-jwt)
- [Documentação Swagger](#documentação-swagger)
- [Regras de Negócio](#regras-de-negócio)

---

## Sobre o Projeto

Sistema de gerenciamento de biblioteca para o IFPB. Permite que alunos façam login, consultem o acervo e realizem empréstimos de livros. Administradores podem cadastrar, atualizar e remover livros, além de gerenciar usuários e acompanhar empréstimos e multas por atraso.

---

## Tecnologias

| Camada      | Tecnologia                          |
|-------------|-------------------------------------|
| Back-end    | Node.js, Express 5                  |
| Banco de dados | SQLite (via Sequelize ORM)       |
| Autenticação | JWT (jsonwebtoken) + bcryptjs      |
| Documentação | Swagger (swagger-jsdoc + swagger-ui-express) |
| Utilitários | nodemon (dev)                       |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/Sistema-de-cadastros-de-livros.git

# Entre na pasta do projeto
cd Sistema-de-cadastros-de-livros/biblioteca-ifpb-api

# Instale as dependências
npm install
```

---

## Executando o Servidor

```bash
# Modo desenvolvimento (com hot-reload via nodemon)
npm run dev

# Modo produção
node server.js
```

O servidor será iniciado em `http://localhost:3000`.

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `biblioteca-ifpb-api/` com as seguintes variáveis (opcional — o projeto usa valores padrão quando não definidas):

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
```

---

## Estrutura do Projeto

```
biblioteca-ifpb-api/
├── public/                  # Arquivos estáticos (front-end)
├── src/
│   ├── app.js
│   ├── controllers/         # Lógica dos endpoints
│   │   ├── AdminController.js
│   │   ├── AuthController.js
│   │   ├── BookController.js
│   │   └── LoanController.js
│   ├── database/
│   │   ├── config/          # Configuração do Sequelize
│   │   ├── migrations/
│   │   ├── models/          # Modelos: Book, User, Loan, Fine
│   │   └── seeders/
│   ├── middleware/
│   │   ├── auth.js          # Verificação de token JWT e permissões
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoute.js
│   │   ├── bookRoute.js
│   │   ├── loansRoute.js
│   │   └── adminRoute.js
│   ├── services/
│   └── utils/
└── server.js                # Ponto de entrada da aplicação
```

---

## Endpoints da API

**URL Base:** `http://localhost:3000/api`

### Autenticação

| Método | Endpoint                  | Descrição               | Auth |
|--------|---------------------------|-------------------------|------|
| POST   | `/auth/login`             | Realizar login          | Não  |
| POST   | `/auth/login/rest-password` | Solicitar reset de senha | Não |

**Exemplo — Login:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```
Resposta:
```json
{
  "token": "<jwt_token>"
}
```

---

### Usuários / Perfil

| Método | Endpoint              | Descrição                        | Auth  |
|--------|-----------------------|----------------------------------|-------|
| POST   | `/admin/register`     | Cadastrar novo usuário           | Não   |
| GET    | `/admin/profile/:id`  | Obter perfil do usuário          | Sim   |
| PUT    | `/admin/profile/:id`  | Atualizar perfil do usuário      | Sim   |
| GET    | `/admin/users`        | Listar todos os usuários (admin) | Admin |

---

### Livros

| Método | Endpoint                      | Descrição                           | Auth  |
|--------|-------------------------------|-------------------------------------|-------|
| GET    | `/books`                      | Listar todos os livros (com filtros)| Não   |
| GET    | `/books/available`            | Listar livros disponíveis           | Não   |
| GET    | `/books/category/:category`   | Listar livros por categoria         | Não   |
| GET    | `/books/stats`                | Estatísticas do acervo (admin)      | Admin |
| GET    | `/books/:id`                  | Buscar livro por ID                 | Não   |
| POST   | `/books`                      | Cadastrar novo livro (admin)        | Admin |
| PUT    | `/books/:id`                  | Atualizar livro (admin)             | Admin |
| PATCH  | `/books/:id/status`           | Atualizar status do livro           | Sim   |
| DELETE | `/books/:id`                  | Remover livro (admin)               | Admin |

**Filtros disponíveis em `GET /books`:**

| Parâmetro  | Tipo   | Descrição                            |
|------------|--------|--------------------------------------|
| `title`    | string | Filtrar por título                   |
| `author`   | string | Filtrar por autor                    |
| `category` | string | Filtrar por categoria                |
| `status`   | string | Filtrar por status (`Disponível`, `Emprestado`, `Reservado`, `Indisponível`) |

**Exemplo — Cadastrar livro (admin):**
```http
POST /api/books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Alta Books",
  "category": "Engenharia de Software",
  "version": 1.0
}
```

**Status válidos para `PATCH /books/:id/status`:**
```json
{ "status": "Disponível" }
```
Opções: `Disponível`, `Emprestado`, `Reservado`, `Indisponível`

---

### Empréstimos

| Método | Endpoint               | Descrição                                      | Auth  |
|--------|------------------------|------------------------------------------------|-------|
| POST   | `/loans`               | Criar novo empréstimo                          | Sim   |
| GET    | `/loans`               | Listar empréstimos do usuário autenticado      | Sim   |
| PATCH  | `/loans/:id/return`    | Registrar devolução do livro                   | Sim   |
| GET    | `/loans/admin/all`     | Listar todos os empréstimos — paginado (admin) | Admin |
| GET    | `/loans/admin/overdue` | Listar empréstimos em atraso (admin)           | Admin |

**Exemplo — Criar empréstimo:**
```http
POST /api/loans
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": 1,
  "loanPeriodDays": 30
}
```

**Filtros disponíveis em `GET /loans`:**

| Parâmetro | Tipo   | Descrição                                  |
|-----------|--------|--------------------------------------------|
| `status`  | string | `Active`, `Overdue`, `Returned`            |

---

### Administração

Os endpoints de administração exigem autenticação com um usuário de role `admin`.

---

## Autenticação JWT

Endpoints protegidos exigem o token JWT no cabeçalho da requisição:

```
Authorization: Bearer <seu_token>
```

O token é obtido no endpoint `POST /api/auth/login`.

**Exemplo com `fetch`:**
```js
const response = await fetch('http://localhost:3000/api/books', {
  headers: {
    'Authorization': 'Bearer SEU_TOKEN'
  }
});
const livros = await response.json();
console.log(livros);
```

---

## Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3000/api-docs
```

---

## Regras de Negócio

- **Empréstimos:** O prazo de devolução é configurável (padrão: 30 dias). Também é aceito o período de 90 dias.
- **Multas:** Após o vencimento do prazo, é gerada automaticamente uma multa de **R$ 0,50 por dia de atraso**.
- **Livros:** Apenas administradores podem cadastrar, editar e remover livros do acervo.
- **Usuários:** O cadastro de novos usuários é aberto. O gerenciamento completo da lista de usuários é restrito a administradores.


