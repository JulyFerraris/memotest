let bookController = {}

let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]


bookController.searchBook = (req,res) => {
   const nombre_libro = req.query.name
   const libros_filtrados = nombre_libro ? libros.filter(i => i.name.startsWith(nombre_libro)) : libros
   if(libros_filtrados === "") return res.status(404).send('El libro no existe')
   return res.status(200).send(libros_filtrados)
}

bookController.showBook = (req,res) => {
   const id = req.params.id
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         return res.status(200).send(libros[id])
      } 
   }
   return res.status(404).send('El libro no existe')
}

bookController.addBook = (req,res) => {
   let nombre_libro = req.body.name
   if(nombre_libro !== ""){
      libros.push({'id': libros.length, 'name': nombre_libro})
      return res.status(201).send(libros[libros.length - 1])
   }
   return res.status(400).send("el campo name es requerido")
}

bookController.editBook = (req,res) => {
   const id = req.params.id
   let nombre_libro = req.body.name
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id) {
         if(nombre_libro !== ""){
            libros[i].name = nombre_libro;
            return res.status(200).send(libros[id])
         } else {
            return res.status(400).send("el campo name es requerido")
         }
      }
   }
   return res.status(404).send('No se puede modificar porque el libro no existe')
}

bookController.deleteBook = (req,res) => {
   const id = req.params.id
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         libros.splice(i,1);
         return res.status(200).send('El libro fué eliminado')
      } 
   }
   return res.status(404).send('No se puede borrar porque el libro no existe')
}


module.exports = bookController