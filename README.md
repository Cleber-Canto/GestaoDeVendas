
### Descrição do Projeto

Este projeto é uma aplicação de gestão de vendas construída com Node.js e Express, utilizando Prisma como ORM para interagir com um banco de dados PostgreSQL. A aplicação permite a gestão de clientes, produtos, pedidos e associações entre usuários e funções. Ela implementa rotas para criar, listar, atualizar e deletar clientes, produtos, pedidos, e gerenciar as permissões dos usuários através das funções.

### Estrutura do Projeto

#### Diretórios Principais:
- **controllers**: Contém os controladores que lidam com a lógica de cada rota.
- **services**: Contém os serviços que interagem diretamente com o banco de dados através do Prisma.
- **routes**: Contém as definições das rotas da aplicação.
- **utils**: Contém utilitários, como middlewares para tratamento de erros.

### Como Rodar o Projeto

1. **Clone o repositório do GitHub para sua máquina local:**
   ```sh
   git clone https://github.com/usuario/gestao-de-vendas.git
   cd gestao-de-vendas
   ```

2. **Instale as dependências:**
   Certifique-se de que você tenha o Node.js e npm instalados na sua máquina. Em seguida, instale as dependências do projeto:
   ```sh
   npm install
   ```

3. **Configure o banco de dados:**
   Configure a variável de ambiente `DATABASE_URL` no seu arquivo `.env` com a URL de conexão do PostgreSQL.
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco"
   ```

4. **Execute as migrações do Prisma:**
   Crie as tabelas no banco de dados com base no esquema do Prisma.
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Gere o cliente Prisma:**
   Gere o cliente Prisma para interagir com o banco de dados.
   ```sh
   npx prisma generate
   ```

6. **Inicie o servidor:**
   Execute o servidor Node.js:
   ```sh
   npm start
   ```

7. **Teste a aplicação:**
   Você pode testar a aplicação utilizando ferramentas como Postman ou Insomnia para fazer requisições HTTP para as rotas da API.

### Preparando para Subir no GitHub

1. **Inicialize um repositório Git:**
   Caso ainda não tenha feito isso.
   ```sh
   git init
   ```

2. **Adicione os arquivos ao repositório:**
   ```sh
   git add .
   ```

3. **Faça um commit com uma mensagem descritiva:**
   ```sh
   git commit -m "Initial commit of the sales management application"
   ```

4. **Crie um repositório no GitHub:**
   Vá até GitHub e crie um novo repositório.

5. **Adicione o repositório remoto e faça o push:**
   ```sh
   git remote add origin https://github.com/usuario/gestao-de-vendas.git
   git push -u origin master
   ```

### Estrutura dos Arquivos

Aqui está um exemplo de como a estrutura dos arquivos deve parecer:

```
gestao-de-vendas/
├── controllers/
│   ├── clienteController.ts
│   ├── pedidoController.ts
│   ├── pedidoProdutoController.ts
│   ├── produtoController.ts
│   ├── roleController.ts
│   ├── usuarioController.ts
│   ├── usuarioRoleController.ts
├── routes/
│   ├── authRoutes.ts
│   ├── clienteRoutes.ts
│   ├── pedidoRoutes.ts
│   ├── pedidoProdutoRoutes.ts
│   ├── produtoRoutes.ts
│   ├── roleRoutes.ts
│   ├── usuarioRoutes.ts
│   ├── usuarioRoleRoutes.ts
├── services/
│   ├── clienteService.ts
│   ├── pedidoService.ts
│   ├── pedidoProdutoService.ts
│   ├── produtoService.ts
│   ├── roleService.ts
│   ├── usuarioService.ts
│   ├── usuarioRoleService.ts
├── utils/
│   ├── errors.handling.ts
├── .env
├── package.json
├── prisma/
│   ├── schema.prisma
├── server.ts
└── tsconfig.json
```

Testes

Você pode testar a aplicação utilizando ferramentas como Postman ou Insomnia para fazer requisições HTTP para as rotas da API. Abaixo estão algumas das rotas disponíveis:
Clientes

    Criar Cliente: POST /clientes

    Listar Clientes: GET /clientes

    Buscar Cliente por ID: GET /clientes/:id

    Atualizar Cliente: PUT /clientes/:id

    Deletar Cliente: DELETE /clientes/:id

Produtos

    Criar Produto: POST /produtos

    Listar Produtos: GET /produtos

    Buscar Produto por ID: GET /produtos/:id

    Atualizar Produto: PUT /produtos/:id

    Deletar Produto: DELETE /produtos/:id

Pedidos

    Criar Pedido: POST /pedidos

    Listar Pedidos: GET /pedidos

    Atualizar Pedido: PUT /pedidos/:id

    Deletar Pedido: DELETE /pedidos/:id

Funções e Permissões

    Criar Role: POST /roles

    Listar Roles: GET /roles

    Atualizar Role: PUT /roles/:id

    Deletar Role: DELETE /roles/:id

    Associar Usuário a Role: POST /usuarioRoles

    Listar Associações de Usuários e Roles: GET /usuarioRoles

    Atualizar Associação de Usuário e Role: PUT /usuarioRoles/:id

    Deletar Associação de Usuário e Role: DELETE /usuarioRoles/:id


    sudo docker run --name sales -p 5435:5432 -e POSTGRES_PASSWORD=nova_senha -e POSTGRES_USER=postgres -d postgres