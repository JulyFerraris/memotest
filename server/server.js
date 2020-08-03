const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/api/prueba', (req, res) => {
   return res.send({
      'mensaje': 'Saludos desde nuestro server !!',
      'hora': (new Date()).toISOString() 
   })
});

app.post('/api/prueba', (req, res) => {
   let contenido = req.body
   return res.send(contenido)
});


app.get('/api/tablero', (req, res) => {
   return res.send({
      tablero: [['A','B'],['C','B'],['C','A']]
   })
});


let tableros = []


// armar tabero
app.post('/api/tableros', (req, res) => {
   let ancho = req.body.ancho
   let alto = req.body.alto 
   let fichas = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
   let cantPares = (ancho * alto) / 2
   let misFichas = [...fichas]
   let misFichasElegidas = []
   let miTablero = []

   if (!ancho || !alto) return res.status(400).send('El ancho y el alto son obligatorios')
   if ((ancho * alto) % 2 === 1) return res.status(400).send('La grilla debe contener cantidad par de celdas, modifique el ancho o el alto')

   for(let i = 0; i < cantPares; i++){
      let indiceRandom = Math.floor(Math.random() * misFichas.length)
      let ficha = misFichas[indiceRandom]
      misFichasElegidas.push(ficha, ficha)
      misFichas.splice(indiceRandom, 1)
   }

   for(let y = 0; y < ancho; y++){
      let fila = []
      for(let x = 0; x < alto; x++){
         let indiceRandom = Math.floor(Math.random() * misFichasElegidas.length)
         let ficha = misFichasElegidas[indiceRandom]
         fila.push(ficha)
         misFichasElegidas.splice(indiceRandom, 1) 
      }
      miTablero.push(fila)
   }
   tableros.push({'tableroId': tableros.length, 'tablero': miTablero})
   return res.status(201).send(tableros[tableros.length - 1])
});

// chequear si el tablero existe
const existeTablero = (tableroId) => tableroId < tableros.length


// pedir el contenido de una ficha
app.get('/api/tableros/:tableroId', (req, res) => {
   let posX = req.query.posX
   let posY = req.query.posY
   let id = req.params.tableroId

   if(!existeTablero(id)) return res.status(404).send('el tablero no existe')
   if (!posX || !posY) return res.status(400).send('faltan datos para encontrar la ficha')
   if (posX >= tableros[id].tablero.length || posY >= tableros[id].tablero[0].length) return res.status(400).send('Por favor ingrese coordenadas válidas')
   
   return res.status(200).send({
      'posX': posX,
      'posY': posY,
      'valor': tableros[id].tablero[posX][posY]
   })
});


// mandarle al servidor un par de fichas para comparar
app.post('/api/tableros/:tableroId', (req, res) => {
   let ficha1 = req.body.ficha1
   let ficha2 = req.body.ficha2
   let id = req.params.tableroId

   if(!existeTablero(id)) return res.status(404).send('el tablero no existe')
   if(!ficha1 || !ficha2) return res.status(400).send('se necesitan 2 fichas para poder comparar')

   if(ficha1[0] === ficha2[0] && ficha1[1] === ficha2[1]){ 
      return res.status(400).send('elija 2 fichas distinas')
   }

   if(ficha1[0] >= tableros[id].tablero.length || ficha1[1] >= tableros[id].tablero[0].length){ 
      return res.status(400).send('Por favor ingrese coordenadas válidas para ficha 1')
   }

   if(ficha2[0] >= tableros[id].tablero.length || ficha2[1] >= tableros[id].tablero[0].length) {
      return res.status(400).send('Por favor ingrese coordenadas válidas para ficha 2')
   }

   tableros[id].tablero[ficha1[0]][ficha1[1]] === tableros[id].tablero[ficha2[0]][ficha2[1]] ?
      res.status(201).send(true) : res.status(201).send(false)

});



/*
//consultar el estado de la partida al servidor 
app.get('/api/tableros/:tableroId/estado', (req, res) => {
   let sigueJugando = true
   if(tablero.length === paresEncontrados) {
      return res.status(200).send(false)
   } 
   return res.status(404).send("el tablero no existe")
});*/


app.listen(port, () => console.log(`Listening on port ${port}`))







let libros = [{ 'id': 0, 'name': 'Dracula'},{ 'id': 1, 'name': '1984'} ]



app.get('/api/libros', (req, res) => {
   const nombre_libro = req.query.name
   const libros_filtrados = nombre_libro ? libros.filter(i => i.name.startsWith(nombre_libro)) : libros
   return res.send(libros_filtrados)
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