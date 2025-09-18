const express = require('express');
const routes = require('./src/routes');
const { authenticateToken } = require('../biblioteca-ifpb-api/src/middLeware/auth.js');
const path = require('path');

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca IFPB API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros, empréstimos, multas e usuários'
    },
    servers: [
      { url: 'http://localhost:3000/api' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            author: { type: 'string' },
            publisher: { type: 'string' },
            category: { type: 'string' },
            version: { type: 'number' },
            status: { type: 'string', example: 'Disponível' }
          }
        },
        Loan: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            bookId: { type: 'integer' },
            loanDate: { type: 'string', format: 'date-time' },
            dueDate: { type: 'string', format: 'date-time' },
            returnDate: { type: 'string', format: 'date-time', nullable: true },
            status: { type: 'string', example: 'Active' }
          }
        },
        Fine: {
          type: 'object',
            properties: {
              id: { type: 'integer' },
              userId: { type: 'integer' },
              loanId: { type: 'integer' },
              amount: { type: 'number', example: 5.50 },
              status: { type: 'string', example: 'Pending' }
            }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', example: 'admin' }
          }
        },
        AuthLoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          }
        },
        AuthLoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        },
        CreateBookInput: {
          type: 'object',
          required: ['title','author','publisher','category'],
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            publisher: { type: 'string' },
            category: { type: 'string' },
            version: { type: 'number', default: 1.0 }
          }
        },
        CreateLoanInput: {
          type: 'object',
          required: ['bookId'],
          properties: {
            bookId: { type: 'integer' },
            loanPeriodDays: { type: 'integer', example: 30 }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Rotas
app.use('/api', routes);

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});