/* Authentification : Créer un modèle User avec Sequelize */
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization //on recupere l'entete http, c est dans cette entente que transitera le jeton jwt envoyé par nos consomateurs
  

  //on verifie que le jeton a bien été fournis, sinon on retourne une erreur
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1] //on recupere le jeton JWT envoyé par l utilisateur dans la constante token, on split pour separé 'bearer' du JWT
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => { //on verifie si le jeton correspond
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next() //on laisse l user passé avec la methode next()
    }
  })
}