module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Publicacao: {
            type: DataTypes.DATE,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('disponivel', 'indisponivel'),
            defaultValue: 'disponivel'
        }
    });

    return Book;
}