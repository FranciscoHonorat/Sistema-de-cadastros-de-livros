const dataSource = require('../database/models');
const Services = require('./Services.js');

class AuthServices extends Services {
    constructor() {
        super('User');
    }
    
        async buscaPorEmail(email) {
        // Usamos unscoped() para ignorar o defaultScope que exclui a senha
        return await dataSource[this.model].unscoped().findOne({ where: { email } });
    }

    async login(email, password) {
        console.log('Email recebido:', email);
        console.log('Senha recebida:', password);
        
        const usuario = await this.buscaPorEmail(email);
        if (!usuario) {
            console.log('Usuário não encontrado');
            throw new Error('Usuário não encontrado');
        }

        console.log('Hash no banco:', usuario.password);
        const senhaValida = await usuario.checkPassword(password);
        console.log('Senha válida:', senhaValida);

        if (!senhaValida) {
            throw new Error('Senha incorreta');
        }

        const usuarioSemSenha = { ...usuario.toJSON() };
        delete usuarioSemSenha.password;

        return usuarioSemSenha;
    }
}

module.exports = AuthServices;