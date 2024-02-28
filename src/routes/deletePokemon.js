const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = 'Le pokemon demandé n\'existe pas, reessayez avec un autre identidiant'
                return res.statut(404).json({ message })
            }
            const pokemonDeleted = pokemon;
            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `le pokemon avec l'identifiant numero ${pokemonDeleted.id} a bien été supprimé`
                    res.json({ message, data: pokemonDeleted })
                })
        })
            //permet d'afficher une message s il y a un erreur lors de la recuperation des pokemons
            .catch(error => {
                const message = `Le pokemon n'a pas pu etre recuperé. Reessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })

}