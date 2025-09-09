module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.EMUM('estudante', 'admin'),
            defaultValue: 'estudante'
        }
    });

    User.associate = (models)  => {
        User.hasMany(models.emprestimo, { foreingKey: 'userId' });
        User.hasMany(models.multa, { foreingKey: 'userId' });
    };

    return User;
}