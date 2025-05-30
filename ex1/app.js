// app.js
const express = require('express');
const app = express();
const PORT = 25000;

// Middleware para interpretar JSON
app.use(express.json());

// Importa as rotas
const edicoesRoutes = require('./routes/edicoesRoutes');
app.use('/', edicoesRoutes);

// Inicia a conexão com o banco e o servidor
const { connectDB } = require('./models/db');
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API a correr na porta ${PORT}`));
  })
  .catch(err => console.error('Erro na conexão com a base de dados:', err));
