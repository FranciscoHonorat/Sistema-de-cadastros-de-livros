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