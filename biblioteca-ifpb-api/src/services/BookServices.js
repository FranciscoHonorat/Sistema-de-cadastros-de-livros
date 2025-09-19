const { Op, col, where } = require('sequelize');
const { Book } = require('../database/models');

const normalizeForSearch = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

class BookServices {
  async list(filters = {}) { return this.getAllBooks(filters); }

  async getAllBooks(filters = {}) {
    const and = [];
    const addCondition = (field, value) => {
      const normalizedValue = normalizeForSearch(value);
      if (normalizedValue) {
        and.push(where(col(field), { [Op.like]: `%${normalizedValue}%` }));
      }
    };

    addCondition('titleSearch', filters.title);
    addCondition('authorSearch', filters.author);
    addCondition('categorySearch', filters.category);

    if (filters.status && String(filters.status).trim() !== '') {
      and.push({ status: String(filters.status).trim() });
    }

    const whereClause = and.length ? { [Op.and]: and } : undefined;
    return Book.findAll({ where: whereClause, order: [['title', 'ASC']] });
  }
}

module.exports = new BookServices();