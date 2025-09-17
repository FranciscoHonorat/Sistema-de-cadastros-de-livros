const { Loan, Book, User } = require('../models');
const { Op } = require('sequelize');

class LoanServices {
    async getAllLoans(filters = {}) {
        try {
            const where = {};

            //Filtro por status
            if (filters.status) {
                where.status = filters.status;
            }

            // Filtro por data de empréstimo
            if (filters.loanDate) {
                where.loanDate = {
                    [Op.gte]: new Date(filters.loanDate)
                };
                if (filters.endDate) {
                    where.loanDate[Op.lte] = new Date(filters.endDate);
                }
            }
            const loans = await Loan.findAll({
                where,
                include: {
                    model: Book,
                    as: 'book',
                    attributes: [ 'id', 'title', 'author']
                }
            });
    
            return loans;

        } catch (error) {
            console.error('Erro ao buscar empréstimos: ', error);
            throw new Error('Erro ao buscar empréstimos');
        }

    }

    async createLoan({ bookId, userId}) {
        try {
            const book = await Book.findByPk(bookId);
            if (!book) {
                throw new Error('Livro não encontrado');
            }
            if (book.status !== 'available') {
                throw new Error('Livro não está disponível para empréstimo');
            }

            const user = await User.findByPk(userId);

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const activeLoansCount = await Loan.count( {
                where: {
                    userId,
                    status: 'ongoing',
                    bookId: { [Op.ne]: bookId }
                }
            });

            if (activeLoansCount >= user.maxLoans) {
                throw new Error('Limite de empréstimos ativos atingido');
            }

            const loan = await Loan.create({
                bookId,
                userId,
                status: 'ongoing',
                loanDate: new Date()
            });

            book.status = 'unavailable';
            await book.save();

            return loan;
        } catch (error) {
            console.error('Erro ao criar empréstimo: ', error);
            throw new Error(error.message || 'Erro ao criar empréstimo');
        }
    }
}
