const mongoose  = require('mongoose')
const BookModel  = require('../models/BookModel')


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection

let bookService = {}
let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]


bookService.searchBook = (bookName) => {
   //const libros_filtrados = bookName ? libros.filter(i => i.name.startsWith(bookName)) : libros
   //return(libros_filtrados)
   //return BookModel.find({ name: bookName }).lean().then( i => {
   //   console.log(i)
   //   return i
   //})

   if(!bookName) return BookModel.find({}).lean()
   return BookModel.find({name: {$regex: bookName, $options: 'i'}}).lean()
}

bookService.showBook = (id) => {
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         return (libros[id])
      } 
   }
}


bookService.addBook = (bookName) => {
   //libros.push({'id': libros.length, 'name': bookName})
   //return(libros[libros.length - 1])
   const id = parseInt(Math.random() * 1000)
   const newBook = new BookModel({ id: id, name: bookName})
   newBook.save()
   return(newBook)
}

bookService.doesBookExist = (id) => id < libros.length

bookService.nameBookExist = (name) => name.length > 0

bookService.editBook = (id, bookName) => {
   for(let i = 0; i < libros.length; i++){
      if(libros[i].id == id) {
         libros[i].name = bookName;
         return(libros[id])
      }
   }
}


bookService.deleteBook = (id) => {
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         libros.splice(i,1);
         return('El libro fué eliminado')
      } 
   }
}


module.exports = bookService