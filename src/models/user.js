module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { //rendre le nom unique
                msg: 'Le nom est deja pris.'
            }
            // validate: {
            //     notEmpty: {msg: 'Le nom ne peut pas etre vide'},
            //     notNull: {msg: 'Le nom est une propriété requise'}
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        // validate: {
        //     notEmpty: {msg: 'Le mdp ne peut pas etre vide'},
        //     notNull: {msg: 'Le mdp est une propriété requise'}
        // }
    })
}