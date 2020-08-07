class TableroClient{

   constructor(updateState){
      this._updateState = updateState
   }

   //acá vamos a controlar la 1er pegada
   
   requestBoard = (ancho, alto) => {
      const data = { ancho: ancho, alto: alto  } 
		fetch('/api/tableros', {
			method: 'POST',
			headers: {
			 'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
 		.then(resultado => this._updateState({ 
         //tablero: resultado.tablero,
         tablero: Array.from({ length: ancho }).map(i => Array.from({ length: alto })),
			tableroId: resultado.tableroId 
		}))
		.catch(err => console.log(err))
   }

   //acá vamos a controlar la 2da
   getChipContent = (tableroId, posX, posY, posiblePar) => {
      fetch(`/api/tableros/${tableroId}?posX=${posX}&posY=${posY}`)
      .then(response => response.json())
      .then(response => {
         this._updateState({
            posiblePar: [...posiblePar, response]
         })
      })
      .catch(err => console.log(err)) 
   }

   

   //acá vamos a controlar la 3ra
   compareChips = (tableroId,posX1, posY1, posX2,posY2) => {}

   //acá vamos a controlar la 4ta
   getGameStatus = (tableroId) => {}
}


export default TableroClient