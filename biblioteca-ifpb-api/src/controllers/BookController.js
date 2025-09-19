const BookServices = require('../services/BookServices');
const asyncHandler = require('../utils/asyncHandler');

class BookController {
  constructor() {
    this.bookServices = new BookServices();
    // Binds para garantir o 'this' correto
    this.list = asyncHandler(this.list.bind(this));
    this.create = asyncHandler(this.create.bind(this));
    this.getById = asyncHandler(this.getById.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
  }

  async list(req, res) {
    console.log('[Controller] Recebidos filtros:', req.query);
    const data = await this.bookServices.getAllBooks(req.query);
    res.status(200).json(data);
  }

  async create(req, res) {
    const book = await this.bookServices.createBook(req.body);
    res.status(201).json(book);
  }

  async getById(req, res) {
    const { id } = req.params;
    const book = await this.bookServices.getBookById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Livro não encontrado' });
    }
    res.status(200).json(book);
  }

  async update(req, res) {
    const { id } = req.params;
    const updatedBook = await this.bookServices.updateBook(id, req.body);
    res.status(200).json(updatedBook);
  }

  async delete(req, res) {
    const { id } = req.params;
    await this.bookServices.deleteBook(id);
    res.status(204).send();
  }
}

module.exports = new BookController();