const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Token de acesso requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_apenas_para_desenvolvimento', async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }

        try {
            // Busca o usuário no banco para verificar se ainda existe e tem permissões atualizadas
            const user = await User.findByPk(decoded.id);
            
            if (!user) {
                return res.status(403).json({ message: 'Usuário não encontrado' });
            }

            // Adiciona informações do usuário ao request
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            };
            
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao verificar usuário' });
        }
    });
};

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Requer permissão de administrador.' });
    }
    next();
};

// Middleware opcional para verificar token sem obrigatoriedade
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(); // Continua sem usuário autenticado
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_apenas_para_desenvolvimento', async (err, decoded) => {
        if (err) {
            return next(); // Continua sem usuário autenticado em caso de token inválido
        }

        try {
            const user = await User.findByPk(decoded.id);
            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                };
            }
            next();
        } catch (error) {
            next(); // Continua sem usuário autenticado em caso de erro
        }
    });
};

module.exports = {
    authenticateToken,
    requireAdmin,
    optionalAuth
};