const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => { //get all read books
  Controllers.readingBooksController.getReadingBooks(res);
});

// router.get('/:id', (req, res) => { //get specific read book
//   console.log(res.body);
//   console.log(req.params.id);
//   Controllers.readingBooksController.getReadingBookById(req, res);
// });

router.get('/:id', (req, res) => {
  Controllers.readingBooksController.getUsersReadingBooks(req, res);
});

router.post('/create', (req, res) => { //create a book in the 'read' pile
  Controllers.readingBooksController.createReadingBook(req.body, res);
});


router.put('/:id', (req, res) => { // update a book in the 'read' pile
  Controllers.readingBooksController.updateReadingBook(req, res);
});

router.delete('/:id', (req, res) => { // delete a book in the 'read' pile
  Controllers.readingBooksController.deleteReadingBook(req, res);
});

module.exports = router;
