const express = require('express')
const app = express()
const familiaModel = require('./src/model/familia')

app.use(express.json())

app.post('/familias', async(req, res) => {
    const response = await familiaModel.create ({
        nome: req.body.nome,
        idade: req.body.idade,
        profissao: req.body.profissao,
    })
    return res.status(200).json ({
        data:response      
    })
} )


app.get('/familias', async(req, res) => {
    const membros = await familiaModel.find({}) // comando mongodb

    //const membrosMaiorDezAnos = membros.filter(item => item.idade >= 30) // comando em JS para filtro da informação que se queira do BD.

    //const nomeTeste = membros.filter(item => item.nome == "Ana") // dessa forma == ele pega a escrita exatamente igual

    // const nomeTeste1 = membros.filter(item => item.nome. include("s")) erro ao usar .includes, verificar

    return res.status(200).json({
        data:  membros
    })
})



app.get('/familias/:id', async(req, res) => {
    const membro = await familiaModel.findOne({_id: req.params.id})  /* com findOne ele retorna um único objeto, melhor para tratar, com find apenas, ele retornará 
                                                                     um array e possivelmente terá vários objetos dentro, mais difícil de tratar*/

    const membroid = await familiaModel.findById(req.params.id) 

    return res.status(200).json({
        data: membroid
    })
})



app.use(express.json())
app.listen(8080, () => {
    console.log('Servidor conectado!')
})

