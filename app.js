const express = require('express')
// const helper = require('.helper.js') // on importe notre module helper
const sequelize = require('./src/db/sequelize') //On importe Sequelize pour se connecter à la BDD ainsi que les DataTypes qui contient les types dans Sequelize
// const { success, getUniqueId } = require('./helper.js') // on importe directement la methode succes (on utilise les accolade)
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// let pokemons = require('./src/db/mock-pokemon.js')
// const PokemonModel = require('./src/models/pokemon') // on importe notre model PokemonModel

const app = express()
const port = 3000


//USE
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) //morgan remplace la const logger
    .use(bodyParser.json())
    
sequelize.initDb() //on appelle la methode initDb

//ici , nous placerons nos futurs points de terminaison :
require('./src/routes/findAllPokemons')(app)

//autre syntax:
//on importe notre point de terminaison,
// qui est exporté sous la forme d'un fonction.
// const finalAllPokemons = require('/src/routes/findAllPokemons')
//on met en place une nouvelle route aupres d'Express, en appelant notre point de terminaison avec le parametre 'app'
//Pour rappel, "app" est notre application Express.
// finalAllPokemons(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)


//On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application node est demaré sur le port ${port}`))