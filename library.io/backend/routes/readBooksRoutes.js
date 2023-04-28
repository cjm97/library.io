const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => { //get all read books
  Controllers.readBooksController.getReadBooks(res);
});

router.get('/:id', (req, res) => { //get specific read book
  console.log(res.body);
  console.log(req.params.id);
  Controllers.readBooksController.getReadBookById(req, res);
});

router.post('/create', (req, res) => { //create a book in the 'read' pile
  Controllers.readBooksController.createReadBook(req.body, res);
});


router.put('/:id', (req, res) => { // update a book in the 'read' pile
  Controllers.readBooksController.updateReadBooks(req, res);
});

router.delete('/:id', (req, res) => { // delete a book in the 'read' pile
  Controllers.readBooksController.deleteReadBooks(req, res);
});

module.exports = router;
