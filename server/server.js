const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/api/prueba', (req, res) => {
   res.send({
      'mensaje': 'Saludos desde nuestro server !!',
      'hora': (new Date()).toISOString() 
   })
});

app.post('/api/prueba', (req, res) => {
   let contenido = req.body
   res.send(contenido)
});



app.get('/api/tablero', (req, res) => {
   res.send({
      tablero: [['A','B'],['C','B'],['C','A']]
   })
});

app.listen(port, () => console.log(`Listening on port ${port}`))




let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]


app.get('/api/libros', (req, res) => {
   return res.send(libros)
});

app.get('/api/libros/:id', (req, res) => {
   const id = req.params.id
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         return res.status(200).send(libros[id])
      } 
   }
   return res.status(404).send('El libro no existe')
});


app.post('/api/libros', (req, res) => {
   let nombre_libro = req.body.name
   if(nombre_libro !== ""){
      libros.push({'id': libros.length, 'name': nombre_libro})
      return res.status(201).send(libros[libros.length - 1])
   }
   return res.status(400).send("el campo name es requerido")
});



app.put('/api/libros/:id', (req, res) => {
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
});


app.delete('/api/libros/:id', (req, res) => {
   const id = req.params.id
   for( let i = 0; i < libros.length; i++){
      if( libros[i].id == id ){
         libros.splice(i,1);
         return res.status(200).send('El libro fué eliminado')
      } 
   }
   return res.status(404).send('No se puede borrar porque el libro no existe')
});