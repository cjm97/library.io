'use strict';

const Models = require('../models');

const getBooks = (res) => {
  Models.Books.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getBookById = (req, res) => {
  Models.Books.findAll({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createBook = (req, res) => {
  Models.Books.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const addSearchBooks = async (req) => {
  for (let i = 0; i < req.length; i++) {
    const bookData = req[i];
    let author;
    let categories;
    if (bookData.volumeInfo.authors) {
      author = bookData.volumeInfo.authors.toString();
    } else {
      author = 'No Author';
    }
    if (bookData.volumeInfo.categories) {
      categories = bookData.volumeInfo.categories.toString();
    } else {
      categories = 'No categories';
    }
    let bookObj = {
      id: bookData.id,
      book_name: bookData.volumeInfo.title,
      book_subtitle: bookData.volumeInfo.subtitle,
      book_description: bookData.volumeInfo.description,
      book_publisher: bookData.volumeInfo.publisher,
      book_pages: bookData.volumeInfo.pageCount,
      book_category: categories,
      book_author: author,
    };

    const [book, created] = await Models.Books.findOrCreate({
      where: { id: bookData.id },
      defaults: bookObj,
    });
  }
};

const updateBook = (req, res) => {
  Models.Books.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteBook = (req, res) => {
  Models.Books.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  addSearchBooks,
  updateBook,
  deleteBook,
};
