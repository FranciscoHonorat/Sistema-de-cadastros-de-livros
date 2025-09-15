const express = require('express');
const router = express.Router();
exports.router = router;
const { authenticateToken, requireAdmin } = require('../middLeware/auth.js');
const AdminController = require('../controllers/AdminController.js');

// Rotas protegidas
router.get('/profile/:id', authenticateToken, AdminController.pegarUsuario);
router.post('/register', AdminController.registraUsuario);
router.put('/profile/:id', authenticateToken, AdminController.atualizarPerfil);

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