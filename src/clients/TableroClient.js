class TableroClient{

   constructor(updateState){
      this._updateState = updateState
   }

   //acá vamos a controlar la 1er pegada
   requestBoard = () => {
      const data = { ancho: 2, alto: 3 } 
		fetch('/api/tableros', {
			method: 'POST',
			headers: {
			 'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
 		.then(resultado => this._updateState({ 
			tablero: resultado.tablero,
			tableroId: resultado.tableroId 
		}))
		.catch(err => console.log(err))
   }

   //acá vamos a controlar la 2da
   getChipContent = (tableroId, posX, posY) => {
      fetch(`/api/tableros/${tableroId}?posX=${posX}&posY=${posY}`)
      .then(response => response.json())
      .then(response => console.log(response))
		.catch(err => console.log(err))
   }

   

   //acá vamos a controlar la 3ra
   compareChips = (tableroId,posX1, posY1, posX2,posY2) => {}

   //acá vamos a controlar la 4ta
   getGameStatus = (tableroId) => {}
}


export default TableroClient