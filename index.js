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


app.use(express.json())
app.listen(8080, () => {
    console.log('Servidor conectado!')
})

