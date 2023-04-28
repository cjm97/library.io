const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => {
  Controllers.booksController.getBooks(res);
});

router.get('/:id', (req, res) => {
  Controllers.booksController.getBookById(req, res);
});

router.post('/create', (req, res) => {
  Controllers.booksController.createBook(req.body, res);
});


router.put('/:id', (req, res) => {
  Controllers.booksController.updateBook(req, res);
});

router.delete('/:id', (req, res) => {
  Controllers.booksController.deleteBook(req, res);
});

module.exports = router;
