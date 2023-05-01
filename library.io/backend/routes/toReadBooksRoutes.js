const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => {
  //get all read books
  Controllers.toReadBooksController.getToReadBooks(res);
});

// router.get('/:id', (req, res) => { //get specific read book
//   console.log(res.body);
//   console.log(req.params.id);
//   Controllers.toReadBooksController.getToReadBookById(req, res);
// });

router.get('/:id', (req, res) => {
  Controllers.toReadBooksController.getUsersToReadBooks(req, res);
});

router.post('/create', (req, res) => {
  //create a book in the 'read' pile
  Controllers.toReadBooksController.createToReadBook(req.body, res);
});

router.put('/:id', (req, res) => {
  // update a book in the 'read' pile
  Controllers.toReadBooksController.updateToReadBook(req, res);
});

router.delete('/:user_id/books/:book_id', (req, res) => {
  // delete a book in the 'read' pile
  Controllers.toReadBooksController.deleteToReadBook(req, res);
});

module.exports = router;
