O que eu quero construir?
    vou construir uma API que funciona com um sistema de biblioteca do ifpb, onde vamos ter os alunos cadastrados com seus ID,
    ele vai ter um sistema de login básico onde cada usuário vai ter um cadastro em um banco de dados SQLite, depois, ele vai pode alugar os livros e no sistema vai gerar um data de devolução dos livros, que vai ser gerada a partir do momento em que ele pega o livro tendo o equivalente a 30 dais ou 90 dias para devolução do livro e passando desse prazo, ele vai receber um multa equivalente a 0,5 reais por dia de atraso.

    Parte do aluno:
    - Sistema de login 
    - Sistema de aluguel de livros
    - Sistema de multa por atraso.

    Parte do servidor da biblioteca:
    - Cadastrar livros
        Organização por categoria, nome, autor e editora.
    - Atualizar condição do livro:
        - alugado ou ta disponivel.
        - Versão atualizada do livro.
    - Excluir
        -poderem mantendo o registro apenas apagando completamente.
    - gerenciar usuarios com livros alugados.

    Sistema de segurança para cada usuário que entrar e sair, um sistema de login do servidor.
    Sistema de monitoramento de lista de livros com IA.

Tecnologias:

    front end: hmtl5, css3, javascript ou angular ou react
    back end: node.js, express, sqllite, ORM e swagger para documentação da API
    
    # Biblioteca IFPB API

API para gerenciamento de livros, usuários, empréstimos e multas da Biblioteca IFPB.

## URL Base
```
http://localhost:3000/api
```

## Endpoints Principais

### Autenticação
#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "usuario@email.com",
    "password": "senha"
  }
  ```
- **Resposta de sucesso:**
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Livros
#### Listar livros
- **GET** `/books`
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "titulo": "Livro Exemplo",
      "autor": "Autor"
    }
  ]
  ```

#### Adicionar livro (admin)
- **POST** `/books`
- **Headers:**
  - Authorization: Bearer `token`
- **Body:**
  ```json
  {
    "titulo": "Novo Livro",
    "autor": "Autor",
    "categoria": "Categoria",
    "editora": "Editora",
    "versao": "1.0"
  }
  ```

### Empréstimos
#### Listar empréstimos do usuário
- **GET** `/loans`
- **Headers:**
  - Authorization: Bearer `token`

### Multas
#### Listar multas do usuário
- **GET** `/fines`
- **Headers:**
  - Authorization: Bearer `token`

## Autenticação
Alguns endpoints exigem autenticação JWT. Envie o token no header:
```
Authorization: Bearer seu_token
```

## Exemplo de uso com fetch
```js
fetch('http://localhost:3000/api/books', {
  headers: { 'Authorization': 'Bearer SEU_TOKEN' }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Observações
- Para mais detalhes, acesse a documentação Swagger em: `http://localhost:3000/api-docs`
- Apenas admins podem adicionar livros e gerenciar usuários.


