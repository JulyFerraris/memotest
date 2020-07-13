const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/api/prueba', (req, res) => {
   res.send({
      'mensaje': 'Saludos desde nuestro server !!',
      'hora': (new Date()).toISOString() 
   })
});

app.listen(port, () => console.log(`Listening on port ${port}`))