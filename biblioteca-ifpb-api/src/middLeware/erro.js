const errorHandler = (err, req, res, next) => {
  console.error('[ERROR HANDLER]', err.name, err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Ocorreu um erro interno no servidor.';

  // Trata erros de validação do Sequelize de forma mais amigável
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400; // Bad Request
    message = err.errors.map(e => e.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;