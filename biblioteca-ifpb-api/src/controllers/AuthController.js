const jwt = require('jsonwebtoken');
const AuthServices = require('../services/AuthServices');
const authServices = new AuthServices();

class AuthController {
    static async registraUsuario(req, res) {
        const { name ,email, password, studentId } = req.body;

        try {
            //validação dos campos obrigatórios
            if (!name || !email || !password || !studentId) {
                return res.status(400).json({
                    error: 'Todos os campos são obrigatórios!'
                });
            }

            const novoUsuario = await authServices.registraUsuario({
                name,
                email,
                password,
                studentId,
                role: 'user' // definição do papel padrão como 'user'
            });

            //Removendo senha da resposta!
            const usuarioResponse = { ...novoUsuario.toJSON() };
            delete usuarioResponse.password;

            return res.status(201).json({
                message: 'Usuário registrado com sucesso!',
                usuario: usuarioResponse
            });
        } catch (error) {
            if (error.message === 'Email já está em uso' ||
                error.message === 'Matrícula já está em uso') {
                    return res.status(409).json({ error: error.message });
                }
            
            return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            //Validação dos campos obrigatórios
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Email e senha são obrigatórios!'
                });
            }

            const usuario = await authServices.login(email, password);
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '24h' } // Token expira em 24 horas
            );
            return res.status(200).json({
                message: 'Login realizado com sucesso',
                usuario,
                token: token
            });
        } catch (error) {
            if (error.message === 'Usuário não encontrado' ||
                error.message === 'Senha incorreta'
            ) {
                return res.status(401).json({ error: 'Credenciais inválidas'});
            }

            return res.status(500).json({ error: error.message});
        }
    }

    //Obter perfil do usuário autenticado
    static async pegarUsuario(req, res) {
        try {
            const usuario = await authServices.pegaUmRegistroPorId(req.userId);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario não encontrado'});
            }

            return res.status(200).json({ usuario });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    //Atualizar perfil do usuário
    static async atualizarPerfil(req, res) {
        const { name, email } = req.body;

        try {
            //Verificar se o novo email já está em uso por outro usuário:
            if (email) {
                const usuarioComEmail = await authServices.buscaPorEmail(email);
                if (usuarioComEmail && usuarioComEmail.id !== req.userId) {
                    return res.status(409).json({ error: 'Email já está em uso'});
                }
            }

            const atualizado = await authServices.atualizaRegistro(
                { name, email }, { id: req.userId }
            );

            if (!atualizado) {
                return res.status(400).json({ error: 'Não foi possível atualizar o perfil'});
            }

            return res.status(200).json({ message: 'Perfil atualizado com sucesso'});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;