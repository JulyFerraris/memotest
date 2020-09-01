const BoardService = require('../services/BoardService')
let boardController = {}

// chequear si el tablero existe
const existeTablero = (tableroId) => tableroId < tableros.length

boardController.requestBoard = (req,res) => {
   let ancho = req.body.ancho
   let alto = req.body.alto
   if (!ancho || !alto) return res.status(400).send('El ancho y el alto son obligatorios')
   if ((ancho * alto) % 2 === 1) return res.status(400).send('La grilla debe contener cantidad par de celdas, modifique el ancho o el alto')
   const response = BoardService.requestBoard(ancho,alto)
   return res.status(201).send(response)
}

boardController.getChipContent = (req,res) => {
   let posX = req.query.posX
   let posY = req.query.posY
   let id = req.params.tableroId

   if(!existeTablero(id)) return res.status(404).send('el tablero no existe')
   if (!posX || !posY) return res.status(400).send('faltan datos para encontrar la ficha')
   if (posX >= tableros[id].tablero.length || posY >= tableros[id].tablero[0].length) return res.status(400).send('Por favor ingrese coordenadas válidas')
   
   return res.status(200).send({
      'posX': parseInt(posX),
      'posY': parseInt(posY),
      'value': tableros[id].tablero[posX][posY]
   })
}

boardController.compareChips = (req,res) => {
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

   const pares = tableros[id].tablero[ficha1[0]][ficha1[1]] === tableros[id].tablero[ficha2[0]][ficha2[1]]
   
   const ficha1B = {
      'posX': ficha1[0],
      'posY': ficha1[1],
      'value': tableros[id].tablero[ficha1[0]][ficha1[1]]
   }

   const ficha2B = {
      'posX': ficha2[0],
      'posY': ficha2[1],
      'value': tableros[id].tablero[ficha2[0]][ficha2[1]]
   }

   jugadas.push({
         'tablero': id,
         'ficha1': ficha1B,
         'ficha2': ficha2B,
         'resultado': pares
   })

   res.status(201).send(jugadas[jugadas.length - 1])
}

boardController.getGameStatus = (req,res) => {
   let id = req.params.tableroId
   const ancho = tableros[id].ancho
   const alto = tableros[id].alto
   let cantPares = (ancho * alto) / 2
    
   if(!existeTablero(id)) return res.status(404).send('el tablero no existe')
   
   const cantIntentos = jugadas.filter(j => j.tablero === id).length
   const paresEncontrados = jugadas.filter(j => j.resultado && j.tablero === id)
   let estadoPartida = paresEncontrados.length === cantPares ? 'FINISHED' : 'PLAYING' 

   const respuesta = {
      'status': estadoPartida, 
      'attempts': cantIntentos
   }

   return res.status(200).send(respuesta)
}

module.exports = boardController