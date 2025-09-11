const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
  // Verifica se where está vazio para prevenir atualizações acidentais em toda a tabela
  if (Object.keys(where).length === 0) {
    throw new Error('Condições de atualização não fornecidas');
  }
  
  const listaDeRegistrosAtualizados = await dataSource[this.model].update(
    dadosAtualizados,
    {
      where: { ...where },
      transaction: transacao,
    }
  );
  if (listaDeRegistrosAtualizados[0] === 0) {
    return false;
  }
  return true;
}

  async excluiRegistro(where) {
    return dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;