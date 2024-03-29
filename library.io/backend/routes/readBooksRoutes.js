const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => {
  //get all read books
  Controllers.readBooksController.getReadBooks(res);
});


router.post('/create', (req, res) => {
  //create a book in the 'read' pile
  Controllers.readBooksController.createReadBook(req.body, res);
});

router.get('/:id', (req, res) => {
  Controllers.readBooksController.getUsersReadBooks(req, res);
});

router.get('/:user_id/books/:book_id', (req, res) => {

  Controllers.readBooksController.getUsersReadBook(req, res);
});

router.put('/:user_id/books/:book_id', (req, res) => {

  Controllers.readBooksController.updateReadBook(req, res);
});

router.delete('/:user_id/books/:book_id', (req, res) => {
  // delete a book in the 'read' pile
  Controllers.readBooksController.deleteReadBook(req, res);
});

module.exports = router;
