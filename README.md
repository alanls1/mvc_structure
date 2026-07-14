# Node MVC JWT Auth 🔐

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-informational)

Projeto backend com Node.js estruturado em arquitetura MVC, com sistema de autenticação utilizando JWT (Access e Refresh Token) e testes automatizados com Jest.

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como estudo para praticar organização de código com **MVC**, implementar **autenticação segura** com JWT e aplicar **testes unitários** nas principais funcionalidades.

Atualmente, o sistema permite:

- Criação de usuários (mockado)
- Login de usuários (mockado)
- Geração de Access Token e Refresh Token
- Validação e renovação do Refresh Token
- Testes com Jest para os fluxos de autenticação

## 🎯 Escopo

O módulo **`users`** é o foco do estudo: autenticação completa (login, criação de conta, refresh token) com cobertura de testes unitários, incluindo casos de erro e expiração de token.

Os módulos `products`, `categories` e `tags` estão no repositório como estrutura MVC de referência (model/controller/routes/service), mas ainda **não têm CRUD completo** — hoje só expõem listagem. Ficam aqui como scaffold da mesma arquitetura, não como funcionalidades prontas.

---

## 🧱 Estrutura do Projeto

A estrutura segue o padrão MVC e está dividida em módulos:
users/

├── tests/

│ ├── controller.test.ts

│ └── service.test.ts

├── mocks/

├── user.controller.ts

├── user.dto.ts

├── user.model.ts

├── user.routes.ts

└── user.service.ts


---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Jest](https://jestjs.io/) para testes

---

## 📦 Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/alanls1/mvc_structure.git
cd mvc_structure

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# preencha DATABASE, DATABASE_USERNAME, PASSWORD, JWT_SECRET e REFRESH_TOKEN_SECURE

# Inicie o servidor em modo dev
npm run dev

# Executar todos os testes
npm run test
```

