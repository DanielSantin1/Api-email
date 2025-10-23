require("dotenv").config();

const express = require("express");
const admin = require("firebase-admin");
const app = express();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  console.log("Rodando em modo de Produção (lendo variável de ambiente) - index.js:10");
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log("Rodando em modo de Desenvolvimento (lendo serviceAccountKey.json) - index.js:16");
  const serviceAccount = require('./serviceAccountKey.json'); 
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("API PontoSul com Node.js e Firestore está no ar!");
});

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
    console.error("Erro ao buscar dados: - index.js:43", err);
    res.status(500).send("Erro ao consultar o banco de dados.");
  }
});

app.get("/api/cancelar", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send("Erro: Email não fornecido.");
  }

  try {
    await db.collection("cancelamentos").doc(email).set({
      email: email,
      dataCancelamento: new Date(),
    });

    res.send(
      `<html><body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
         <h2>Inscrição Cancelada</h2>
         <p>O email <strong>${email}</strong> foi removido da nossa lista com sucesso.</p>
       </body></html>`
    );
  } catch (err) {
    console.error("Erro ao salvar dados: - index.js:68", err);
    res.status(500).send("Erro ao salvar no banco de dados.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} - index.js:74`);
  console.log(`Para testar, acesse http://localhost:${port} - index.js:75`);
});