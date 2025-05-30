// app.js
const express = require('express');
const app = express();
const PORT = 25001;

// Configura o motor de templates EJS e o diretório de views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para interpretar dados provenientes do corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importa e utiliza as rotas definidas
const interfaceRoutes = require('./routes/interfaceRoutes');
app.use('/', interfaceRoutes);

app.listen(PORT, () => {
  console.log(`Interface a correr na porta ${PORT}`);
});
