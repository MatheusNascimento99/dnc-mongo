const express = require('express')
const app = express()
const familiaModel = require('./src/model/familia')
const mongoose = require('mongoose')

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

    if (req.query.idade){
        const membros = await familiaModel.find({}).gt('idade', req.query.idade) /* comando mongodb, a onde nessa partte <('idade', req.query.idade) >, ele passa na URL o valor da idade que 
        deseja ou superior devido ao gt do mongo, e ainda posso passar um filtro dentro do find como nome por exemplo, para 
        afuniliar ainda mais a busca, lt funciona como gt, mas é para baixo , buscando números menos do que o informado na url.*/

        return res.status(200).json({
            data:  membros
        })
    }
    

    //const membrosMaiorDezAnos = membros.filter(item => item.idade >= 30) // comando em JS para filtro da informação que se queira do BD.

    //const nomeTeste = membros.filter(item => item.nome == "Ana") // dessa forma == ele pega a escrita exatamente igual

    // const nomeTeste1 = membros.filter(item => item.nome. include("s")) erro ao usar .includes, verificar

    const membros = await familiaModel.find({})
    return res.status(200).json({
        data:  membros
    })
})



app.get('/familias/:id', async(req, res) => {
    try {
    const membro = await familiaModel.findOne({_id: req.params.id})  /* com findOne ele retorna um único objeto, melhor para tratar, com find apenas, ele retornará 
                                                                     um array e possivelmente terá vários objetos dentro, mais difícil de tratar*/

    const membroid = await familiaModel.findById(req.params.id) 

    return res.status(200).json({
        data: membroid
    })
    }
    catch (error) {
        return res.status(400).json({
            data: {},
            message: 'Não foi possível localizar esse ID'
        })
    }
})

app.put('/familias/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            data: {},
            message: 'O ID não corresponde a um objeto válido!'
        })
    }

    const membro= await familiaModel.updateOne({_id: req.params.id}, req.body)  /* método para atualizar a informação do BD, bucado pelo Id, através da requisição
    req, e passado a alteração pela requisição do body */
    return res.status(200).json({
        data: membro
    })
})



app.delete('/familias/:id', async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({
            data: {},
            message: 'O ID não corresponde a um objeto válido!'
        })
    }

    const membro= await familiaModel.deleteOne({_id: req.params.id}) 
    return res.status(200).json({
        data: membro,
        message:`Membro deletado }`
    })
})



app.use(express.json())
app.listen(8080, () => {
    console.log('Servidor conectado!')
})

