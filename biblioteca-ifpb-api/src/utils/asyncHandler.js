/**
 * Envolve uma função de controller assíncrona para capturar erros
 * e passá-los para o próximo middleware de erro (errorHandler).
 * @param {function} fn A função do controller (req, res, next) => Promise<...>
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;