const express = require('express')
const router = express.Router()
const BoardController = require('./controllers/BoardController')
const BookController = require('./controllers/BookController')

router.post('/tableros', BoardController.requestBoard)
router.get('/tableros/:tableroId', BoardController.getChipContent)
router.post('/tableros/:tableroId', BoardController.compareChips)
router.get('/tableros/:tableroId/estado', BoardController.getGameStatus)


router.get('/libros', BookController.searchBook)
router.post('/libros', BookController.addBook)
router.get('/libros/:id', BookController.showBook)
router.put('/libros/:id', BookController.editBook)
router.delete('/libros/:id', BookController.deleteBook)

module.exports = router