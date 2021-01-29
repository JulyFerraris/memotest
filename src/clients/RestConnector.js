

const defaultPOSTReqData = {
   'method': 'POST',
   'headers': {
      'Content-Type': 'application/json'
   }
}

class RestConnector {
   _doRequest = (url, data) => {
      return fetch(url, data)
      
      //manejo de errores
      .then(response => {
         if (!response.ok){
            throw new Error("Hubo un problema con el pedido: (" + response.status + ")")
         }
         return response
      })
      .then(response => {
         return {
            statusCode: response.status,
            body: response.json()
         }
     })
   }
   

   _doGET = (url, headers) => {
      return this._doRequest(url)
   }

   _doPOST = (url, headers, body) => {
      return this._doRequest(url, {...defaultPOSTReqData, body: body})
   }
}

export default RestConnector