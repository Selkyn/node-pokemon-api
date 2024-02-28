/* L’API Rest et la Base de données : Créer un modèle Sequelize */
//gere la connexion avec la BDD
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt') //import du module bcrypt


//pour se connecter à la BDD
const sequelize = new Sequelize(
  'pokedex',  //nom de la BDD
  'root', //identifiant pour la BDD
  '', // MDP
  {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes) // on instancie notre model PokemonModel, je veux qu tu créé la table pokemon associé au model PokemonModel

const initDb = () => {
  return sequelize.sync({ force: true }).then(_ => { //on synchronise avec la BDD
    //ma boucle pour ajouter les pokemon
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types // permet de joindre les données du tableau en string pour pouvoir les mettre en BDD, on utilisera split pour faire le contraire
      }).then(pokemon => console.log(pokemon.toJSON())) //traitement asyncrone avec then. toJSON permet d'afficher que les valeurs qui nous interesse en json
    })

    bcrypt.hash('pikachu', 10)//parametre : MDP, temps necessaire pour hasher le mdp
    .then(hash => { // on recup le mdp crypté
      User.create({
        username: 'pikachu',
        password: hash
      })
    })
    // .then(user => console.log(user.toJSON()))


    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon, User //initDB permet d initilaisé notre BDD et le model sequelize pokemon
}