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
   res.send(libros)
});


app.post('/api/libros', (req, res) => {
   let nombre_libro = req.body.name
   libros.push({'id': libros.length, 'name': nombre_libro})
   res.send(libros[libros.length - 1])
});


app.get('/api/libros/:id', (req, res) => {
   const id = req.params.id
   res.send(libros[id])
});




app.put('/api/libros/:id', (req, res) => {
   const id = req.params.id
   let nombre_libro = req.body.name
   for( let i=0; i<libros.length; i++){
      if( libros[i].id === id ){
         libros[i].name = nombre_libro;
      }
   }
   res.send(libros[id])
});

app.delete('/api/libros/:id', (req, res) => {
   const id = req.params.id
   for( let i=0; i<libros.length; i++){
      if( libros[i].id === id ){
         libros.splice(i,1);
      }
   }
   res.send(libros)
});