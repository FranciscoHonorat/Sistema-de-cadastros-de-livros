const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

//Registrar usuário:
router.post('/registrar', async (req, res) => {
    //Lógica de registro.
    try {
        const { nome, email, senha} = req.body;

        //validação:
        if(!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        //Verificar se o usuário já existe:
        const usuarioExistente = await User.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ mensagem: 'Email já cadastrado' });
        }

        //Hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        //Criando um usuário:
        const novoUsuario = await User.create({
            nome,
            email,
            senha: senhaHash
        });

        return res.status(201).json({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        //Lógica para login:
        const { email, senha} = req.body;

        //validação
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
        }

        //Buscando usuário
        const usuario = await User.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
        }

        //Verificando a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
        }

        //Gerando token
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || 'segredo_super_secreto',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao realizar login.', erro: error.message });
    }
});
