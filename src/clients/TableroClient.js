import RestConnector from './RestConnector'


class TableroClient {

   constructor(updateState){
      this._updateState = updateState
      this._connector = new RestConnector()
   }

   requestBoard = (ancho, alto) => {
      const data = { ancho: ancho, alto: alto  } 
      const url = '/api/tableros'
      const body = JSON.stringify(data)
      this._connector._doPOST(url,{},body)
      
 		.then(resultado => {
         this._updateState({ 
            tablero: Array.from({ length: alto }).map(i => Array.from({ length: ancho })),
            tableroId: resultado.body.tableroId,
            status:'PLAYING',
            paresEncontrados: [],
            posiblePar: [],
            attempts: 0,
            error: null
         })
		})
		.catch(err => {
         console.log(err)
         switch(err.statusCode){
            case 400:
               this._updateState({
                  error: {
                     ...err.body,
                     options: err.body.options.map( i => {
                        return {...i, 'action': () => this.requestBoard(i.values.width, i.values.height)}
                     })
                  }
               })
               break
            case 500:
            case 504:
               this._updateState({
                  error: {
                     description: "salio todo mal ...",
                     options: [{'description': 'Reintentar', 'action': () => this.requestBoard(ancho,alto)}]
                  }
               })
               break
         } 
      })
   }


   getChipContent = (tableroId, posX, posY, posiblePar) => {
      const url = `/api/tableros/${tableroId}?posX=${posX}&posY=${posY}`
      this._connector._doGET(url,{})
      .then(response => {
         this._updateState({
            posiblePar: [...posiblePar, response.body],
            error: null
         })
      })
      .catch(err => console.log(err)) 
   }



   compareChips = (tableroId,posX1, posY1, posX2,posY2, paresEncontrados) => {
		const data =  { 'ficha1': [posX1, posY1], 'ficha2': [posX2, posY2] }
      const url = `/api/tableros/${tableroId}`
      const body = JSON.stringify(data)
      this._connector._doPOST(url,{},body)
      
      .then(response => { 
         if (response.body.resultado){
            this._updateState({
               paresEncontrados: [...paresEncontrados, response.body.ficha1, response.body.ficha2],
               mustCheckForVictory: true,
               error: null
            })
         }
      })   
		.catch(err => console.log(err))
   }


   getGameStatus = (tableroId) => {
      const url = `/api/tableros/${tableroId}/estado`
      this._connector._doGET(url,{})

      .then(response => {
         this._updateState({
            attempts: response.body.attempts,
            status: response.body.status,
            error: null
         })
      })
      .catch(err => console.log(err)) 
   }
}


export default TableroClient