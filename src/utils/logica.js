let fichas = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const armarTablero = (arrayDeFichas, cantFilas, cantColumnas) => {

   let cantPares = (cantFilas * cantColumnas) / 2
   let misFichas = [...arrayDeFichas]
   let misFichasElegidas = []
   let miTablero = []
    
   //elijo fichas random
   for(let i = 0; i < cantPares; i++){
      let indiceRandom = Math.floor(Math.random() * misFichas.length)
      let ficha = misFichas[indiceRandom]
      //las subo 2 veces para tener el par
      misFichasElegidas.push(ficha, ficha)
      misFichas.splice(indiceRandom, 1)
   }
   // las separo en las X filas
   for(let y = 0; y < cantFilas; y++){
      let fila = []

      // con la cantidad de X por columna
      for(let x = 0; x < cantColumnas; x++){
         let indiceRandom = Math.floor(Math.random() * misFichasElegidas.length)
         let ficha = misFichasElegidas[indiceRandom]
         fila.push(ficha)
         misFichasElegidas.splice(indiceRandom, 1) 
      }
      miTablero.push(fila)
   }
   return(miTablero)
}

export {fichas, armarTablero };


/*

let fichas = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']


const armarTablero = (arrayDeFichas, cantFilas, cantColumnas) => {

    let cantPares = (cantFilas * cantColumnas) / 2
    let misFichas = [...arrayDeFichas]
    let misFichasElegidas = []
    let miTablero = []
    let tableroOculto = []
    
    //elijo fichas random
    for(let i = 0; i < cantPares; i++){
      let indiceRandom = Math.floor(Math.random() * misFichas.length)
      let ficha = misFichas[indiceRandom]
      //las subo 2 veces para tener el par
      misFichasElegidas.push(ficha, ficha)
      misFichas.splice(indiceRandom, 1)
    }
    // las separo en las X filas
    for(let y = 0; y < cantFilas; y++){
      let fila = []
      let filaOculta = []

      // con la cantidad de X por columna
      for(let x = 0; x < cantColumnas; x++){
        let indiceRandom = Math.floor(Math.random() * misFichasElegidas.length)
        let ficha = misFichasElegidas[indiceRandom]
        fila.push(ficha)
        filaOculta.push(" ")
        misFichasElegidas.splice(indiceRandom, 1) 
      }
      miTablero.push(fila)
      tableroOculto.push(filaOculta)
    }

  return {
    'miTablero': miTablero,
    'tableroOculto': tableroOculto,
    'pares': cantPares
  }
}


//-alguna función que reciba dos “direcciones”, el tablero y diga si son iguales

const tableros = armarTablero(fichas,6,4)
let miTableroOculto = tableros.tableroOculto
let miTablero = tableros.miTablero
let cantPares = tableros.pares
let paresEncontrados = []
let paresEncontradosCant = 0
let intentos = 0

const armarPar = (tablero,oculto, x1, y1, x2,  y2) => {
  intentos = intentos + 1;
  let resultadoTXT = ""

  console.log(tablero)
  console.log("--------------------------------")
  oculto[x1].splice(y1,1,`-${tablero[x1][y1]}-` )
  oculto[x2].splice(y2,1,`-${tablero[x2][y2]}-` )
  console.log(oculto)
  console.log("--------------------------------")
  
  if(tablero[x1][y1] === tablero[x2][y2]){
    paresEncontrados.push(tablero[x1][y1],tablero[x2][y2] )
    paresEncontradosCant = paresEncontradosCant + 1
    resultadoTXT = "Son iguales."

    if(cantPares === paresEncontradosCant) {
      return(`Son iguales. Ganaste en ${intentos} intentos!!!`)
    } 
    
  } else {
    oculto[x1].splice(y1,1," " )
    oculto[x2].splice(y2,1," " )
    resultadoTXT = "Son distintos."
  }

  let resultado = ` 
    ${resultadoTXT}
    Pares encontrados: ${paresEncontradosCant}
    Restan: ${cantPares - paresEncontradosCant}`

  return(resultado)
}

console.log(armarPar(miTablero,miTableroOculto, 0,0,0,1))

*/