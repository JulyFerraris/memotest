let bookService = {}


let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]


bookService.searchBook = (bookName) => {
   const libros_filtrados = bookName ? libros.filter(i => i.name.startsWith(bookName)) : libros
   return(libros_filtrados)
}

bookService.showBook = (id) => {
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         return (libros[id])
      } 
   }
}


bookService.addBook = (bookName) => {
   libros.push({'id': libros.length, 'name': bookName})
   return(libros[libros.length - 1])
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