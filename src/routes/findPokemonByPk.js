const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id) //permet de trouvé par clé primaire (pk)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      //permet d'afficher une message s il y a un erreur lors de la recuperation des pokemons
      .catch(error => {
        const message =  `Le pokemon n'a pas pu etre recuperé. Reessayez dans quelques instants.`
        res.status(500).json({message, data: error})
    })
  })
}
