/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'] //tableau pour les types valides
module.exports = (sequelize, DataTypes) => { //parametres : sequelize represente la connexion à la BDD / datatype definit le type de données de notre modele comme string, integer etc
    return sequelize.define('Pokemon', { // Pokemon est le nom du model, donc le nom de la table qui va etre créé
      id: { // nom de la propriété
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { //rendre le nom unique
            msg: 'Le nom est deja pris.'
        },
        validate: {
            notEmpty: {msg: 'Le nom ne peut pas etre vide'},
            notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie'},
            notNull: {msg: 'Les points de vie sont une propriété requise'},
            min: {
                args: [0],
                msg: 'le nombre de point de vie minimal est de 0'
            },
            max: {
                args: [999],
                msg: 'Le nombre de point de vie max est de 999.'
            }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de competence'},
            notNull: {msg: 'Les points de vie sont une propriété requise'},
            min: {
                args: [0],
                msg: 'le nombre de point de competence minimal est de 0'
            },
            max: {
                args: [99],
                msg: 'Le nombre de point de competence max est de 99.'
            }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {msg: 'Utilisez une URL valide'},
            notNull: {msg: 'L\'image est une propriété requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').split(',') // permet de faire un split quand on recoit de la BDD
        },
        set(types) {
            this.setDataValue('types', types.join()) //transforme le tableau de type en string quand on envoie vers la BDD
        },
        validate: {
            isTypesValid(value) { //ici on fait un validator personalisé, on prend en parametre la valeur contenu dans la BDD
                if(!value) {
                    throw new Error('Un pokemon doit  au moins avoir un type.')
                }
                if(value.split(',').length > 3) {
                    throw new Error('Un pokemon ne peux pas avoir plus de 3 types')
                }
                value.split(',').forEach(type => { //on boucles sur les types du pokemon de la BDD pour savoir si ils correspondent aux types valides
                    if(!validTypes.includes(type)) {
                        throw new Error(`le type d'un pokemon doit appartenir à la liste suivant ${validTypes}`)
                    }
                });
            }
        }
      }
    }, {
      timestamps: true,  //ajoute automatiquement des champs de horodatage createdAt et updatedAt à vos modèles
      createdAt: 'created', //date de creation du modele
      updatedAt: false
    })
  }