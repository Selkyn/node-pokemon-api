const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueContraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        return Pokemon.findByPk(id).then(pokemon => {
          if (pokemon === null) {
            const message = 'Le pokemon demandé n\'existe pas, reessayez avec un autre identidiant'
            return res.statut(404).json({ message })
          }
          const message = `le pokémon ${pokemon.name} a bien été modifié.`
          res.json({ message, data: pokemon })
        })
      })
      //permet d'afficher une message s il y a un erreur lors de la recuperation des pokemons
      .catch(error => {
        if(error instanceof ValidationError) { // on verifie si c est une erreur de validation de sequelize ou non
          return res.status(400).json({ message: error.message, data: error})
      }
      if(error instanceof UniqueContraintError) {
        return res.status(400).json({message: error.message, data: error})
    }
        const message = `Le pokemon n'a pas pu etre recuperé. Reessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}