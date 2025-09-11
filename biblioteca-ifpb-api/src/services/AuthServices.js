const dataSource = require('../database/models');
const Services = require('./Services.js');

class AuthServices extends Services {
    constructor() {
        super('User');
    }

    async buscaPorEmail(email) {
        // Usamos unscoped() para ignorar o defaultScope que exclui a senha
        return dataSource[this.model].unscoped().findOne({ where: { email } });
    }

    async registraUsuario(dadosUsuario) {
        // Verifica se o email já existe
        const usuarioExistente = await this.buscaPorEmail(dadosUsuario.email);
        if (usuarioExistente) {
            throw new Error('Email já cadastrado');
        }

        // Verifica se a matrícula já existe
        const matriculaExistente = await dataSource[this.model].findOne({ 
            where: { studentId: dadosUsuario.studentId } 
        });
        if (matriculaExistente) {
            throw new Error('Matrícula já cadastrada');
        }

        // Cria o usuário
        return await this.criaRegistro(dadosUsuario);
    }

    async login(email, senha) {
        // Busca usuário pelo email (incluindo a senha)
        const usuario = await this.buscaPorEmail(email);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Verifica a senha
        const senhaValida = await usuario.checkPassword(senha);
        if (!senhaValida) {
            throw new Error('Senha incorreta');
        }

        // Remove a senha do objeto de retorno
        const usuarioSemSenha = { ...usuario.toJSON() };
        delete usuarioSemSenha.password;

        return usuarioSemSenha;
    }
}

module.exports = AuthServices;