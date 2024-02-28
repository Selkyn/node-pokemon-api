
//point de terminaison
//on a la route et le traitement associé
const { Pokemon } = require('../db/sequelize') // on importe le model de Pokemon par notre module sequelize
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => { //on importe une fonction qui prend en parametre l'application express toute entiere
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.name) { //si on fait une recherche de pokemon :
            const name = req.query.name //permet d indiquer à express que l on souhaite extraire le parametre name de l'URL
            const limit = parseInt(req.query.limit) || 5 //limite choisi par l'utilisateur OU 5 valeur par default

            if(name.length < 2) {
                const message = 'La recherche doit contenir au moins 2 lettres'
                return res.status(400).json({message})
            }

            return Pokemon.findAndCountAll({ //retourne un nbre limité de résultat mais aussi le nbr total.
                where: {
                    name: { //'name' est la propriété du modele pokemon
                        [Op.like]: `%${name}%` //'name' est le critere de la recherche, on met des [] car c est un operateur de sequelize, on utilise les % pour dire où doit s effectuer la recherche
                    }
                },
                order: ['name'], //permet de faire apparaitre le resultat de ma recherche par ordre croissant
                limit: limit //impose une limite pour la recherche
            })
                .then(({count, rows}) => { //relié à findAndCountAll
                    const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                    res.json({ message, data: rows })
                })
        } else {
            //si on ne fait pas de recherche de pokemon, on retourne tous les pokemons
            Pokemon.findAll({ order: ['name'] }) // on retourne une promesse qui contient la liste de tous les pokemons de la BDD
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: pokemons })
                })
                //permet d'afficher une message s il y a un erreur lors de la recuperation des pokemons
                .catch(error => {
                    const message = `La liste des pokemons n'a pas pu etre recuperée. Reessayez dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
        }

    })
}