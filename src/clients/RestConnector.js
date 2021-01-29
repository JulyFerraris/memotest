
const defaultPOSTHeaders = {
   'method': 'POST',
   'Content-Type': 'application/json'
}

class RestConnector {
   _doRequest = (url, headers, body) => {
      return fetch(url, headers, body)
      
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
      return this._doRequest(url, headers, {})
   }

   _doPOST = (url, headers, body) => {
      return this._doRequest(url, {...defaultPOSTHeaders, headers}, body)
   }
}

export default RestConnector