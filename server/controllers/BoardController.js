const BoardService = require('../services/BoardService')
let boardController = {}


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
   if(!BoardService.doesBoardExist(id)) return res.status(404).send('el tablero no existe')
   if(!posX || !posY) return res.status(400).send('faltan datos para encontrar la ficha')
   if(!BoardService.hasValidCoordinates(id, parseInt(posX), parseInt(posY))) return res.status(400).send('Por favor ingrese coordenadas válidas')
   const response = BoardService.getChipContent(id, parseInt(posX), parseInt(posY))
   return res.status(200).send(response)
}



boardController.compareChips = (req,res) => {
   let ficha1 = req.body.ficha1
   let ficha2 = req.body.ficha2
   let id = req.params.tableroId
   
   if(!BoardService.doesBoardExist(id)) return res.status(404).send('el tablero no existe')

   if(!ficha1 || !ficha2) return res.status(400).send('se necesitan 2 fichas para poder comparar')
   if(ficha1[0] === ficha2[0] && ficha1[1] === ficha2[1]) return res.status(400).send('elija 2 fichas distinas')

   if(!BoardService.hasValidCoordinates(id, parseInt(ficha1[0]), parseInt(ficha1[1]))) return res.status(400).send('Por favor ingrese coordenadas válidas para ficha 1')
   if(!BoardService.hasValidCoordinates(id, parseInt(ficha2[0]), parseInt(ficha2[1]))) return res.status(400).send('Por favor ingrese coordenadas válidas para ficha 2')

   const response = BoardService.compareChips(id, ficha1, ficha2)
   return res.status(201).send(response)
}



boardController.getGameStatus = (req,res) => {
   let id = req.params.tableroId
   
   if(!BoardService.doesBoardExist(id)) return res.status(404).send('el tablero no existe')
   
   const response = BoardService.getGameStatus(id)   
   return res.status(200).send(response)
}

module.exports = boardController