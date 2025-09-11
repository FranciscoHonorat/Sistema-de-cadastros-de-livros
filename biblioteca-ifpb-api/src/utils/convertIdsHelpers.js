function convertIds(params) {
  const where = {};
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      // Converte para número se for um ID (caso a chave tenha 'id' no nome, independente de maiúsculas/minúsculas)
      where[key] = key.toLowerCase().includes('id') ? Number(params[key]) : params[key];
    }
  }
  return where;
}

module.exports = convertIds;