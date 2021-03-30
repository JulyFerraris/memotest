const BookService = require('../services/BookService')
let bookController = {}

let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]


bookController.searchBook = (req,res) => {
   const nombre_libro = req.query.name
   BookService.searchBook(nombre_libro).then(response => {
      return res.status(200).send(response)
   }).catch(err => {
      return res.status(404).send(`No se encontraron libros llamados "` + nombre_libro + `"`)
   })
   
   /*
   
   const response = BookService.searchBook(nombre_libro)
   if(response == "") return res.status(404).send(`No encontramos libros llamados "`+ nombre_libro + `"`)
   return res.status(200).send(response)

   
   const libros_filtrados = nombre_libro ? libros.filter(i => i.name.startsWith(nombre_libro)) : libros
   if(libros_filtrados === "") return res.status(404).send('El libro no existe')
   return res.status(200).send(libros_filtrados) */
}

bookController.showBook = (req,res) => {
   const id = req.params.id
   if(!BookService.doesBookExist(id)) return res.status(404).send('El libro no existe')
   const response = BookService.showBook(id)
   return res.status(200).send(response)

   /*
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         return res.status(200).send(libros[id])
      } 
   }
   return res.status(404).send('El libro no existe') */
}

bookController.addBook = (req,res) => {
   let nombre_libro = req.body.name
   if(!nombre_libro) return res.status(400).send("el campo name es requerido")
   const response = BookService.addBook(nombre_libro)
   return res.status(201).send(response) 

   /* 
   if(nombre_libro !== ""){
      libros.push({'id': libros.length, 'name': nombre_libro})
      return res.status(201).send(libros[libros.length - 1])
   }
   return res.status(400).send("el campo name es requerido") */
}

bookController.editBook = (req,res) => {
   const id = req.params.id
   let nombre_libro = req.body.name
   if(!BookService.doesBookExist(id)) return res.status(404).send('No se puede modificar porque el libro no existe')
   if(!nombre_libro) return res.status(400).send("el campo name es requerido")
   const response = BookService.editBook(id, nombre_libro)
   return res.status(200).send(response) 
   
   /*for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id) {
         if(nombre_libro !== ""){
            libros[i].name = nombre_libro;
            return res.status(200).send(libros[id])
         } else {
            return res.status(400).send("el campo name es requerido")
         }
      }
   }
   return res.status(404).send('No se puede modificar porque el libro no existe')*/
}

bookController.deleteBook = (req,res) => {
   const id = req.params.id
   if(!BookService.doesBookExist(id)) return res.status(404).send('No se puede borrar porque el libro no existe')
   const response = BookService.deleteBook(id)
   return res.status(200).send(response) 

   /*for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         libros.splice(i,1);
         return res.status(200).send('El libro fué eliminado')
      } 
   }
   return res.status(404).send('No se puede borrar porque el libro no existe')*/
}


module.exports = bookController