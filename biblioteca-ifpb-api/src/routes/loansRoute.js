const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController.js');
const { authenticateToken, requireAdmin } = require('../middLeware/auth.js');

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Gestão de empréstimos
 */

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Criar novo empréstimo
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLoanInput'
 *     responses:
 *       201:
 *         description: Empréstimo criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Erro de validação
 */
router.post('/', authenticateToken, LoanController.createLoan);

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Listar empréstimos do usuário autenticado
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por status (Active, Overdue, Returned)
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
router.get('/', authenticateToken, LoanController.getUserLoans);

/**
 * @swagger
 * /loans/{id}/return:
 *   patch:
 *     summary: Devolver livro
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Empréstimo devolvido (pode gerar multa)
 *       404:
 *         description: Empréstimo não encontrado
 */
router.patch('/:id/return', authenticateToken, LoanController.returnLoan);

/**
 * @swagger
 * /loans/admin/all:
 *   get:
 *     summary: Listar todos os empréstimos (admin)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lista paginada
 *       403:
 *         description: Não autorizado
 */
router.get('/admin/all', authenticateToken, requireAdmin, LoanController.getAllLoans);

/**
 * @swagger
 * /loans/admin/overdue:
 *   get:
 *     summary: Listar empréstimos em atraso (admin)
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empréstimos atrasados
 */
router.get('/admin/overdue', authenticateToken, requireAdmin, LoanController.getOverdueLoans);

module.exports = router;
