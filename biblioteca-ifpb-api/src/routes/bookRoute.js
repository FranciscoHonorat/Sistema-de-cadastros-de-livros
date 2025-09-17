const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const { authenticateToken, requireAdmin } = require('../middLeware/auth');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Listar todos os livros
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoria
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filtrar por autor
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrar por título
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get('/', BookController.getAllBooks);

/**
 * @swagger
 * /api/books/available:
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
 * /api/books/stats:
 *   get:
 *     summary: Obter estatísticas dos livros
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas dos livros
 */
router.get('/stats', authenticateToken, requireAdmin, BookController.getBookStats);

/**
 * @swagger
 * /api/books/category/{category}:
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
 *         description: Lista de livros da categoria
 */
router.get('/category/:category', BookController.getBooksByCategory);

/**
 * @swagger
 * /api/books/{id}:
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
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', BookController.getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Criar novo livro (apenas admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publisher
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               category:
 *                 type: string
 *               version:
 *                 type: number
 *                 default: 1.0
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */
router.post('/', authenticateToken, requireAdmin, BookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Atualizar livro (apenas admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               category:
 *                 type: string
 *               version:
 *                 type: number
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 */
router.put('/:id', authenticateToken, requireAdmin, BookController.updateBook);

/**
 * @swagger
 * /api/books/{id}/status:
 *   patch:
 *     summary: Atualizar status do livro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Disponível, Emprestado, Reservado, Indisponível]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.patch('/:id/status', authenticateToken, BookController.updateBookStatus);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Deletar livro (apenas admin)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 */
router.delete('/:id', authenticateToken, requireAdmin, BookController.deleteBook);

module.exports = router;