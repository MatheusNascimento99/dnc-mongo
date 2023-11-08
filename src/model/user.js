const mongoose = require('mongoose')
const conn = require('../../config/mongo')


conn()
//aqui criamos a estrutura da colection
const userSchema = mongoose.Schema({   
    nome: String
})


//esse é o responsável por se conectar a collection
const userModel = mongoose.model('users', userSchema)

module.exports = userModel