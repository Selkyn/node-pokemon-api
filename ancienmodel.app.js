// app.get('/', (req, res) => res.send('hello2 world')) // req = requete, res = response

// app.get('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id) //Cette partie extrait la valeur du paramètre appelé "id" depuis l'objet de requête (req).
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = 'Un pokemon a bien été trouvé.'
//     res.json(success(message, pokemon)) //on utilise la methode succes
//     // res.json(pokemon)
//     // res.send(`Vous avez demandé le pokemon ${pokemon.name} <img src = "${pokemon.picture}">`)
    
// })

// app.get('/api/pokemons', (req, res) => {
//     const message = 'Un pokemon a bien été trouvé.'
    
//         res.json(success(message, pokemons))
// })

// //pour envoyer en post
// app.post('/api/pokemons', (req, res) => {
//     const id = getUniqueId(pokemons) //voir dans helper pour avoir un nouvel id qui aura le chiffre id(le dernier)+1
//     const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}} // il y a double accolade car on ajoute un ensemble de propriété (id et created)
//     pokemons.push(pokemonCreated)
//     const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
//     res.json(success(message, pokemonCreated))
// })


// //pour modifier un pokemon (put)
// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = { ...req.body, id: id} // on ajoute une seule propriété
//     pokemons = pokemons.map(pokemon => { //on boucle avec map l'ancienne liste de pokemon, pour la remplacer par la nouvelle liste avec le nouveau pokemon modifié
//         return pokemon.id === id ? pokemonUpdated : pokemon // on retourne donc la meme liste, sans l'ancien pokemon
//     })
//     const message = `le pokemon ${pokemonUpdated.name} a bien été modifié`
//     res.json(success(message, pokemonUpdated))
// })


// //pour supprimer un pokemon
// app.delete('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDeleted = pokemons.find(pokemon =>pokemon.id === id)
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id) //grace a filter on obtient une nouvelle liste de pokemon sans le pokemon supprimé 
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
//     res.json(success(message, pokemonDeleted)) //on retourne le pokemon supprimé, mais on est pas obligé
// })