// server.js
const express = require('express');
const routes = require('./src/routes');
const { authenticateToken } = require('../biblioteca-ifpb-api/src/middLeware/auth.js');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api', routes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});