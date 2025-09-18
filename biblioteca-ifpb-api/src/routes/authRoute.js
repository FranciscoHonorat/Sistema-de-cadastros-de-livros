const express = require('express');
const router = express.Router();
exports.router = router;
const AuthController = require('../controllers/AuthController.js');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginInput'
 *     responses:
 *       200:
 *         description: Login realizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLoginResponse'
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/login/rest-password:
 *   post:
 *     summary: Reset de senha (placeholder)
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Solicitação registrada
 */
router.post('/login/rest-password', AuthController.resetPassword);

module.exports = router;