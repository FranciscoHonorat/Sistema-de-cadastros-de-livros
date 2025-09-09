const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const autenticaoToken = (req, res, next) => {
    const authCabecalho = req.headers['authorization'];
    const token = authCabecalho && authCabecalho.split(' ')[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const requireAdm = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403).json({ mensagem: 'Acesso negado. Requer permissão de administrador.'});
    }
    next();
};

module.exports = { authenticateToken, requireAdmin };