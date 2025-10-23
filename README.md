# 📧 API de Cancelamento de Newsletter

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![Firestore](https://img.shields.io/badge/Firestore-Google-orange?logo=firebase)
![Render](https://img.shields.io/badge/Deploy-Render-blueviolet?logo=render)

---

## 🚀 Visão Geral do Projeto

**O que faz?**
Uma API simples que recebe um e-mail via URL, salva-o no banco de dados Firestore e retorna uma mensagem de sucesso.

**Tecnologias Utilizadas:**
- Node.js / Express — Servidor da API.
- Firebase Firestore — Banco de dados 100% online e gratuito.
- Render.com — Hospedagem gratuita 24/7.
- Git / GitHub — Controle de versão e deploy.

---

## 📂 Estrutura de Arquivos

Crie os seguintes arquivos na pasta do projeto (ex: `C:\Users\VENDAS\Desktop\Api`).  
Não esqueça de adicionar o arquivo `serviceAccountKey.json` (baixado do Firebase).

### `package.json`
```json
{
  "name": "minha-api-pontosul",
  "version": "1.0.0",
  "description": "API para PontoSul com Firestore",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "firebase-admin": "^12.1.1"
  }
}
```

---

### `index.js`
```js
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  console.log("Rodando em modo de Produção");
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} else {
  console.log("Rodando em modo de Desenvolvimento");
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

app.get("/", (req, res) => res.send("API PontoSul com Node.js e Firestore está no ar!"));

app.get("/api/cancelamentos", async (req, res) => {
  try {
    const snapshot = await db.collection("cancelamentos").get();
    const cancelamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(cancelamentos);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).send("Erro ao consultar o banco de dados.");
  }
});

app.get("/api/cancelar", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).send("Erro: Email não fornecido.");
  try {
    await db.collection("cancelamentos").doc(email).set({ email, dataCancelamento: new Date() });
    res.send(\`
      <html><body style="font-family: Arial; text-align:center; padding-top:50px;">
      <h2>Inscrição Cancelada</h2>
      <p>O email <strong>\${email}</strong> foi removido da nossa lista com sucesso.</p>
      </body></html>\`);
  } catch (err) {
    console.error("Erro ao salvar dados:", err);
    res.status(500).send("Erro ao salvar no banco de dados.");
  }
});

app.listen(port, () => console.log(\`Servidor rodando na porta \${port}\`));
```

---

### `.env`
```bash
PORT=3000
```

---

### `.gitignore`
```bash
node_modules
.env
*.json
*.log
npm-debug.log
```

---

## 📖 Como Usar (Endpoints da API)

### 1. Cancelar Inscrição
**Método:** `GET`  
**URL:** `/api/cancelar`  
**Query Param:** `email`  
**Exemplo:** `/api/cancelar?email=cliente@teste.com`

### 2. Listar Todos os Cancelamentos
**Método:** `GET`  
**URL:** `/api/cancelamentos`

---

## ⚙️ Teste Local

1. `npm install`
2. Baixe o `serviceAccountKey.json` do Firebase.
3. Crie o `.env` com `PORT=3000`.
4. Execute: `node index.js`
5. Teste no navegador:
   - [http://localhost:3000](http://localhost:3000)
   - [http://localhost:3000/api/cancelar?email=teste@local.com](http://localhost:3000/api/cancelar?email=teste@local.com)

---

## ☁️ Deploy na Render (100% Online)

### 🔹 Parte A: GitHub
1. Apague a pasta `.git` se já existir (para limpar histórico).  
2. No terminal, dentro da pasta:
   ```bash
   git init
   git add .
   git commit -m "Commit inicial da API"
   git branch -M main
   git remote add origin https://github.com/DanielSantin1/Api-email.git
   git push -u origin main --force
   ```

### 🔹 Parte B: Render.com
1. Crie um "Web Service" conectado ao seu GitHub.  
2. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `FIREBASE_SERVICE_ACCOUNT_JSON` = conteúdo do seu `serviceAccountKey.json`
3. Clique em **Create Web Service** e aguarde o deploy.

**Exemplo de URL pública:**  
👉 https://api-pontosul.onrender.com/api/cancelar?email=teste@online.com

---

## 💡 Créditos
Feito com ❤️ por [Daniel Santin](https://github.com/DanielSantin1)  
API simples, direta e 100% funcional para cancelamento de e-mails.
