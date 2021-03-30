const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
   id: Number,
   name: String
})

const BookModel = mongoose.model('Book', bookSchema)

module.exports = BookModel