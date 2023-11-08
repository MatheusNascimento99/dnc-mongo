const mongoose = require ('mongoose')

let conn

const connection = () => {
    if (conn) {         // aqui se já houver uma conecxão, eu faço ele retornar ela mesma na linha debaixo, caso não haja ainda uma conecxão eu a crio na linha 10
        return conn
    }

    conn = mongoose.connect('mongodb://127.0.0.1:27017/local')

}

module.exports = connection