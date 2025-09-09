modeule.exports = (sequelize, DataTypes) => {
    const Fine = sequelize.define('Fine', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        status: {
            type: DataTypes.ENUM('Pendente', 'Pago'),
            defaultValue: 'Pendente'
        }
    });

    Fine.associate = (models) => {
        Fine.beLongsTo(models.Usuario, { foreingKey: 'userId' });
        Fine.beLongsTo(models.Emprestimo, { foreingKey: 'loanId' });
    };

    return Fine;
}