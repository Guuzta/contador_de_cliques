const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    password: String,
})

const Model = mongoose.model('players', schema)

module.exports = Model