📧 API de Cancelamento de Newsletter
Esta é uma micro-API simples construída em Node.js e Express, projetada para gerenciar solicitações de cancelamento de inscrição (unsubscribe) de campanhas de e-mail.

Ela se conecta ao Google Firestore para persistir os e-mails que solicitaram a remoção, garantindo que eles não sejam contatados em envios futuros.

✨ Funcionalidades
Endpoint GET /api/cancelar: Registra um novo e-mail na lista de cancelamento.

Endpoint GET /api/cancelamentos: Lista todos os e-mails que já solicitaram o cancelamento.

Integração com Firestore: Utiliza o Firebase Admin SDK para uma conexão segura com o banco de dados NoSQL do Google.

Pronta para Deploy: O código está configurado para rodar localmente para testes ou ser implantado diretamente em serviços como a Render.

🚀 Tecnologias Utilizadas
Node.js: Ambiente de execução do JavaScript no servidor.

Express.js: Framework para criação da API.

Firebase Admin: SDK para conexão com o Firestore.

dotenv: Para gerenciamento de variáveis de ambiente em desenvolvimento.

⚙️ Configuração Local (para Testes)
Siga estes passos para rodar o projeto no seu computador.

1. Clone o repositório: (Se você já tem os arquivos, pule este passo)

Bash

git clone https://github.com/DanielSantin1/Api-email.git
cd Api-email
2. Instale as dependências:

Bash

npm install
3. Configure o Firebase:

Baixe o arquivo serviceAccountKey.json do seu console do Firebase.

Salve este arquivo na raiz do projeto.

Importante: O arquivo .gitignore já está configurado para impedir que este segredo seja enviado ao GitHub.

4. Crie o arquivo .env: Crie um arquivo chamado .env na raiz do projeto e adicione a porta local:

PORT=3000
5. Rode o servidor:

Bash

node index.js
Seu servidor estará rodando em http://localhost:3000.

📖 Como Usar (Endpoints da API)
1. Cancelar Inscrição
Este é o endpoint que você deve colocar no link "Cancelar inscrição" do seu e-mail marketing.

Método: GET

URL: /api/cancelar

Query Param: email (o e-mail do usuário)

Exemplo de uso:

http://localhost:3000/api/cancelar?email=cliente.feliz@gmail.com
Resposta de Sucesso: O servidor retornará uma página HTML simples confirmando o cancelamento.

2. Listar todos os Cancelamentos
Este endpoint é para seu uso administrativo, para ver quem já se descadastrou.

Método: GET

URL: /api/cancelamentos

Exemplo de uso:

http://localhost:3000/api/cancelamentos
Resposta de Sucesso (JSON):

JSON

[
  {
    "id": "cliente.feliz@gmail.com",
    "email": "cliente.feliz@gmail.com",
    "dataCancelamento": "2025-10-23T11:45:00.123Z"
  },
  {
    "id": "outro.cliente@hotmail.com",
    "email": "outro.cliente@hotmail.com",
    "dataCancelamento": "2025-10-23T11:50:22.456Z"
  }
]
☁️ Deploy na Render
Este projeto está pronto para ser implantado na Render.

Envie seu projeto para o GitHub (sempre garantindo que serviceAccountKey.json e .env estão no .gitignore).

Crie um novo "Web Service" na Render e conecte seu repositório.

Use as seguintes configurações:

Comando de Build: npm install

Comando de Start: node index.js

Configure as Variáveis de Ambiente na Render:

NODE_ENV:

Key: NODE_ENV

Value: production

FIREBASE_SERVICE_ACCOUNT_JSON:

Key: FIREBASE_SERVICE_ACCOUNT_JSON

Value: Abra seu arquivo serviceAccountKey.json local, copie todo o conteúdo dele (o JSON inteiro) e cole neste campo. (Marque como "Secret").
