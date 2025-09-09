const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

//middLeware
app.use(bodyParser.json());

//rotas
app.use('/api/user', require('./routes/usuario'));
app.use('/api/livro', require('./routes/livro'));
app.use('/api/loans', require('./routes/loans'));
app.use('/api/admim', require('./routes/admin'));

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});