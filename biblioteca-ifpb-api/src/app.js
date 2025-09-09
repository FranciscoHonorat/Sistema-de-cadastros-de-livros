const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

//middLeware
app.use(bodyParser.json());
app.use(express.json());

//rotas
app.use('/api', require('./routes'));

//Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca IFPB API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;