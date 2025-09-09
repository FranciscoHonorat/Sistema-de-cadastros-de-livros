module.exports =  (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: truncates
        },
        dataLoan: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        vencimento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        devolucao: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('ativo', 'atrasado', 'devolvido'),
            defaultValue: 'ativo'
        }
    });

    Loan.associate = (models) => {
        Loan.belongsTo(models.Usuario, { foreignKey: 'userId' });
        Loan.belongsTo(models.Livro, { foreignKey: 'bookId' });
        Loan.hasOne(models.Multa, { foreingKey: 'loanId' });
    };

    return Loan;
}