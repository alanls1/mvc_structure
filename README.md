# Node MVC JWT Auth 🔐

Projeto backend com Node.js estruturado em arquitetura MVC, com sistema de autenticação utilizando JWT (Access e Refresh Token) e testes automatizados com Jest.

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como estudo para praticar organização de código com **MVC**, implementar **autenticação segura** com JWT e aplicar **testes unitários** nas principais funcionalidades.

Atualmente, o sistema permite:

- Criação de usuários (mockado)
- Login de usuários (mockado)
- Geração de Access Token e Refresh Token
- Validação e renovação do Refresh Token
- Testes com Jest para os fluxos de autenticação

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
git clone https://github.com/seu-usuario/node-mvc-jwt-auth.git
cd node-mvc-jwt-auth

# Instale as dependências
npm install

# Inicie o servidor em modo dev
npm run dev

# Executar todos os testes
npm run test

