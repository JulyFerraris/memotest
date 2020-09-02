let boardService = {}

let fichas = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let tableros = []
let jugadas = []

boardService.requestBoard = (ancho, alto) => {
   let misFichas = [...fichas]
   let misFichasElegidas = []
   let miTablero = []
   let cantPares = (ancho * alto) / 2

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
   tableros.push({
      'tableroId': tableros.length, 
      'tablero': miTablero,
      'alto': alto,
      'ancho': ancho
   })
   return tableros[tableros.length - 1]
}

boardService.getChipContent = (id, posX, posY) => {
   return {
      'posX': posX,
      'posY': posY,
      'value': tableros[id].tablero[posX][posY]
   }
}

boardService.doesBoardExist = (id) => id < tableros.length

boardService.hasValidCoordinates = (id, posX, posY) => posX < tableros[id].tablero.length && posY < tableros[id].tablero[0].length

boardService.compareChips = (id, ficha1, ficha2) => {
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

   return jugadas[jugadas.length - 1]
}



boardService.getGameStatus = (id) => {
   let alto = tableros[id].alto
   let ancho = tableros[id].ancho
   let cantPares = (alto * ancho) / 2
   const cantIntentos = jugadas.filter(j => j.tablero === id).length
   const paresEncontrados = jugadas.filter(j => j.resultado && j.tablero === id)
   let estadoPartida = paresEncontrados.length === cantPares ? 'FINISHED' : 'PLAYING' 

   const respuesta = {
      'status': estadoPartida, 
      'attempts': cantIntentos
   }

   return (respuesta)
}

module.exports = boardService