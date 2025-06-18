# Gamestore

## TODO List

- [x] Página do Administrador
- [x] Gestão de estoque (CRUD)
- [x] Catálogo de produtos com carrinho
- [x] Finalizar o pedido contatando o WhatsApp do vendedor
- [x] FavIcon image
- [x] Autenticação com NextAuthJS
- [x] Mensagem antes de finalizar produto
  - pop-up: "Você será redirecionado para o Whatsapp da loja!"
- [x] Melhorar Scroll e responsividade
- [x] HomePage com Float UI
- [x] Apresentar que usuário está logado
- [x] Descrição da loja
- [x] Descrição do formulário

# Setup
> Instale: NodeJS v.20 e PostgreSQL v.17. Outras versões não foram testadas!

## 1. Adicione o Arquivo `.env` na pasta raiz da aplicação

### 1.1 Aponte para o PostgreSQL local no arquivo:
  ```bash
  DATABASE_URL="postgresql://postgres:YOURPASSWORD@localhost:5432/gamestore"
  DIRECT_URL="postgresql://postgres:YOURPASSWORD@localhost:5432/gamestore"
  ```

### 1.2 Para configurar `NEXTAUTH_SECRET` para NextAuth.js, siga estes passos:
- **Gere a Chave Secreta**: Abra seu terminal e execute:
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
    - Você também pode gerar usando este link: https://generate-secret.vercel.app/32
    - Isso gerará uma string segura codificada em base64.
- Adicione a Chave Secreta ao arquivo `.env`:
    ```bash
    NEXTAUTH_SECRET=seu_segredo_gerado
    ```
    - Substitua seu_segredo_gerado pela sua chave real.

### 1.3 Adicione o número de Whatsapp que a aplicação irá utilizar, ao arquivo `.env`:
  ```bash
  NEXT_PUBLIC_PHONE_NUMBER="5561900000000"
  ```

## 2. Comandos
- inicialize o projeto com o `npm install`
- execute o banco com o comando `npx prisma migrate dev`
- inicie a aplicação com o comando `npm run dev`
- abrir em [http://localhost:3000](http://localhost:3000)
