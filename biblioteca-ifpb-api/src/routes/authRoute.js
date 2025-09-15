const express = require('express');
const router = express.Router();
exports.router = router;
const AuthController = require('../controllers/AuthController.js');
const { authenticateToken, requireAdmin } = require('../middLeware/auth.js');

// Rotas públicas
router.post('/login', AuthController.login);
router.post('/login/rest-password', AuthController.resetPassword);

module.exports = router;