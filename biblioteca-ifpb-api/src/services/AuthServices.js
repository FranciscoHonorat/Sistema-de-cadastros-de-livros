const dataSource = require('../database/models');
const Services = require('./Services.js');

class AuthServices extends Services {
    constructor() {
        super('User');
    }

    async buscaPorEmail(email) {
        return dataSource[this.model].findOne({ where: { email }});
    }

    async registraUsuario(dadosUsuario) {
        // Lógica para verificar se já tem usuario usando o mesmo email.
        const usuarioExistente = await this.buscaPorEmail(dadosUsuario.email);
        if (usuarioExistente) {
            throw new Error('Email já está em uso');
        }

        //Verifica se já existe matrícula
        const matriculaExistente = await dataSource[this.model].findOne({
            where: { studentId: dadosUsuario.studentId }
        });
        if (matriculaExistente) {
            throw new Error('Matrícula já está em uso');
        }

        //Criar novo usuário

        return await this.criaRegistro(dadosUsuario);
    }

    async login(email, senha) {
        // Busca usuário
        const usuario = await this.buscaPorEmail(email);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // Verifica senha
        const senhaValida = await usuario.checkPassword(senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }

        // Remover a senha do objeto de retorno
        const usuarioSemSenha = { ...usuario.toJSON() };
        delete usuarioSemSenha.password;

        return usuarioSemSenha;
    }
}

module.exports = AuthServices;