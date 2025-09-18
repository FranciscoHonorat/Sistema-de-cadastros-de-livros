const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController.js');
const { authenticateToken, requireAdmin } = require('../middLeware/auth.js');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Gestão de livros
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Listar todos os livros
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: author
 *         schema: { type: string }
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', BookController.getAllBooks);

/**
 * @swagger
 * /books/available:
 *   get:
 *     summary: Listar livros disponíveis
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de livros disponíveis
 */
router.get('/available', BookController.getAvailableBooks);

/**
 * @swagger
 * /books/stats:
 *   get:
 *     summary: Obter estatísticas dos livros
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas agregadas
 *       403:
 *         description: Não autorizado
 */
router.get('/stats', authenticateToken, requireAdmin, BookController.getBookStats);

/**
 * @swagger
 * /books/category/{category}:
 *   get:
 *     summary: Listar livros por categoria
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista filtrada
 *       404:
 *         description: Nenhum livro encontrado na categoria
 */
router.get('/category/:category', BookController.getBooksByCategory);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', BookController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Criar novo livro (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Livro criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 */
router.post('/', authenticateToken, requireAdmin, BookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualizar livro (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               author: { type: string }
 *               publisher: { type: string }
 *               category: { type: string }
 *               version: { type: number }
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', authenticateToken, requireAdmin, BookController.updateBook);

/**
 * @swagger
 * /books/{id}/status:
 *   patch:
 *     summary: Atualizar status do livro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Disponível, Emprestado, Reservado, Indisponível]
 *     responses:
 *       200:
 *         description: Status atualizado
 *       400:
 *         description: Status inválido
 *       404:
 *         description: Livro não encontrado
 */
router.patch('/:id/status', authenticateToken, BookController.updateBookStatus);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Deletar livro (admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Removido
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', authenticateToken, requireAdmin, BookController.deleteBook);

module.exports = router;