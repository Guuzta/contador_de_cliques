const mongoose = require('mongoose')

function connect () {
    mongoose.connect('mongodb://localhost:27017/users')

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'Erro na conexão!'))

    db.once('open', () => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    })
}

module.exports = {
    connect,
}