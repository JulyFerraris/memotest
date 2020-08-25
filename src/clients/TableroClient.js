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
         tablero: Array.from({ length: ancho }).map(i => Array.from({ length: alto })),
         tableroId: resultado.tableroId,
         status:'PLAYING'
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
   compareChips = (tableroId,posX1, posY1, posX2,posY2, paresEncontrados) => {
		const data =  { 'ficha1': [posX1, posY1], 'ficha2': [posX2, posY2] }
		fetch(`/api/tableros/${tableroId}`, {
			method: 'POST',
			headers: {
			 'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
      .then(response => response.json())
      .then(response => { 
         console.log(response)
         if (response.resultado){
            this._updateState({
               paresEncontrados: [...paresEncontrados, response.ficha1, response.ficha2]
            })
         }
      })
      
		.catch(err => console.log(err))
   }

   //acá vamos a controlar la 4ta
   getGameStatus = (tableroId) => {
      fetch(`/api/tableros/${tableroId}/estado`)
      .then(response => response.json())
      .then(response => {
         this._updateState({
            attempts: response.attempts,
			   status: response.status
         })
      })
      .catch(err => console.log(err)) 
   }
}


export default TableroClient