const dataSource = require('../database/models');
const Services = require('./Services.js');

class AdminServices extends Services {
    constructor() {
        super('User');
    }

    async buscaPorEmail(email) {
        // Usamos unscoped() para ignorar o defaultScope que exclui a senha
        return await dataSource[this.model].unscoped().findOne({ where: { email } });
    }

    async registraUsuario(dadosUsuario) {
    // Verifica se o email já existe
    const usuarioExistente = await this.buscaPorEmail(dadosUsuario.email);
    if (usuarioExistente) {
        throw new Error('Email já está em uso'); 
    }

    // Verifica se a matrícula já existe
    const matriculaExistente = await dataSource[this.model].findOne({ 
        where: { studentId: dadosUsuario.studentId } 
    });
    if (matriculaExistente) {
        throw new Error('Matrícula já está em uso'); 
    }

    // Cria o usuário direto (hook de hash será chamado)
    return await this.criaRegistro(dadosUsuario);
}
}

odule.exports = AdminServices;