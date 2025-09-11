const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController.js');
const { authenticateToken, requireAdmin } = require('../middLeware/auth.js');

// Rotas públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.registraUsuario);
router.post('/reset-password', AuthController.resetPassword);

// Rotas protegidas
router.get('/profile', authenticateToken, AuthController.pegarUsuario);
router.put('/profile', authenticateToken, AuthController.atualizarPerfil);

// Rotas administrativas
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Implementar lógica para buscar todos os usuários
    res.status(200).json({ message: 'Lista de usuários (apenas admin)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;