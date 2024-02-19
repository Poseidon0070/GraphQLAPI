const mongoose = require('mongoose')
const Schema = mongoose.Schema

let authorSchema = new Schema({
    name : String,
    age : Number,
})

module.exports = mongoose.model('Author', authorSchema)