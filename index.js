// Carrega as variáveis do arquivo .env (apenas para teste local)
require("dotenv").config();

const express = require("express");
const admin = require("firebase-admin");
const app = express();

// A Render vai definir o 'PORT' ou usamos 3000 para teste local
const port = process.env.PORT || 3000;

// Lógica inteligente para carregar a chave do Firebase:
// Se estiver na Render (produção), lê a variável de ambiente.
// Se estiver no seu PC (local), lê o arquivo JSON.
if (process.env.NODE_ENV === 'production') {
  console.log("Rodando em modo de Produção (lendo variável de ambiente) - index.js:15");
  // Pega o JSON colado na variável de ambiente da Render
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log("Rodando em modo de Desenvolvimento (lendo serviceAccountKey.json) - index.js:22");
  // Pega o arquivo baixado do Firebase
  const serviceAccount = require('./serviceAccountKey.json'); 
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Pega a referência do banco de dados
const db = admin.firestore();

// Rota principal
app.get("/", (req, res) => {
  res.send("API PontoSul com Node.js e Firestore está no ar!");
});

// Rota para LER todos os cancelamentos
app.get("/api/cancelamentos", async (req, res) => {
  try {
    const snapshot = await db.collection("cancelamentos").get();
    const cancelamentos = [];
    
    snapshot.forEach((doc) => {
      cancelamentos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(cancelamentos);
  } catch (err) {
    console.error("Erro ao buscar dados: - index.js:53", err);
    res.status(500).send("Erro ao consultar o banco de dados.");
  }
});

// Rota para CRIAR um cancelamento (a que o seu email vai chamar)
// Exemplo de URL: /api/cancelar?email=cliente@teste.com
app.get("/api/cancelar", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send("Erro: Email não fornecido.");
  }

  try {
    // Usamos o email como ID do documento para evitar duplicatas
    await db.collection("cancelamentos").doc(email).set({
      email: email,
      dataCancelamento: new Date(),
    });

    // Retorna uma página de sucesso simples
    res.send(
      `<html><body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
         <h2>Inscrição Cancelada</h2>
         <p>O email <strong>${email}</strong> foi removido da nossa lista com sucesso.</p>
       </body></html>`
    );
  } catch (err) {
    console.error("Erro ao salvar dados: - index.js:82", err);
    res.status(500).send("Erro ao salvar no banco de dados.");
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} - index.js:89`);
  console.log(`Para testar, acesse http://localhost:${port} - index.js:90`);
});