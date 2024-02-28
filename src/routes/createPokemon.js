// const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueContraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokemon ${req.body.name} a bien été créé.`
                res.json({message, data: message})
            })
            //permet d'afficher une message s il y a un erreur lors de la recuperation des pokemons
      .catch(error => {
        if(error instanceof ValidationError) { // on verifie si c est une erreur de validation de sequelize ou non
            return res.status(400).json({ message: error.message, data: error})
        }
        if(error instanceof UniqueContraintError) {
            return res.status(400).json({message: error.message, data: error})
        }
        const message =  `Le pokemon n'a pas pu etre ajouté. Reessayez dans quelques instants.`
        res.status(500).json({message, data: error})
    })
    })
}