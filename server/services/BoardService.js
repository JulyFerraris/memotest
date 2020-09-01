let boardService = {}

let fichas = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let tableros = []
let jugadas = []

boardService.requestBoard = (alto, ancho) => {
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

boardService.getChipContent = (req,res) => {}

boardService.compareChips = (req,res) => {}

boardService.getGameStatus = (req,res) => {}

module.exports = boardService