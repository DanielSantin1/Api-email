# 📧 API de Cancelamento de Newsletter

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![Firestore](https://img.shields.io/badge/Firestore-Google-orange?logo=firebase)
![Render](https://img.shields.io/badge/Deploy-Render-blueviolet?logo=render)

Esta é uma micro-API simples construída em Node.js e Express, projetada para gerenciar solicitações de cancelamento de inscrição (unsubscribe) de campanhas de e-mail.

Ela se conecta ao **Google Firestore** para persistir os e-mails que solicitaram a remoção, garantindo que eles não sejam contatados em envios futuros.

## ✨ Funcionalidades

* **Endpoint GET `/api/cancelar`**: Registra um novo e-mail na lista de cancelamento.
* **Endpoint GET `/api/cancelamentos`**: Lista todos os e-mails que já solicitaram o cancelamento.
* **Integração com Firestore**: Utiliza o Firebase Admin SDK para uma conexão segura com o banco de dados NoSQL do Google.
* **Pronta para Deploy**: O código está configurado para rodar localmente para testes ou ser implantado diretamente em serviços como a **Render**.

## 🚀 Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)**: Ambiente de execução do JavaScript no servidor.
* **[Express.js](https://expressjs.com/pt-br/)**: Framework para criação da API.
* **[Firebase Admin](https://firebase.google.com/docs/admin/setup)**: SDK para conexão com o Firestore.
* **[dotenv](https://www.npmjs.com/package/dotenv)**: Para gerenciamento de variáveis de ambiente em desenvolvimento.

## ⚙️ Configuração Local (para Testes)

Siga estes passos para rodar o projeto no seu computador.

**1. Clone o repositório:**
*(Se você já tem os arquivos, pule este passo)*
```bash
git clone [https://github.com/DanielSantin1/Api-email.git](https://github.com/DanielSantin1/Api-email.git)
cd Api-email
