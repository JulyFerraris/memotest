

const defaultPOSTReqData = {
   'method': 'POST',
   'headers': {
      'Content-Type': 'application/json'
   }
}

class CustomError {
   constructor(statusCode, message, body){
      this.statusCode = statusCode
      this.message = message
      this.body = body
   }
}

class RestConnector {
   _doRequest = (url, data) => {
      let statusCode = 0
      let success = false
      return fetch(url, data)

      .then(response => {
         statusCode = response.status
         success = response.ok
         return response.json()
      })
      .then(response => {
         if (!success){
            throw new CustomError(statusCode, "Hubo un problema con el pedido", response)
         }
         return {
            statusCode: statusCode,
            body: response
         }
      })
      .catch(err => {
         if (err.statusCode) {
            throw err
         }
         throw new CustomError(statusCode, "Hubo un problema con la conexión", {})
      })
   }
   

   _doGET = (url, headers) => {
      return this._doRequest(url, {})
   }

   _doPOST = (url, headers, body) => {
      return this._doRequest(url, {...defaultPOSTReqData, body: body})
   }
}



export default RestConnector