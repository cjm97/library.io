'use strict';
const axios = require('axios');
const Models = require('../models');
const { Op } = require('sequelize');

const getReadingBooks = (res) => {
  Models.ReadingBooks.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};


const getUsersReadingBooks = (req, res) => {
  // get specific user's books that match with their id requested
  Models.ReadingBooks.findAll({ where: { user_id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};


const createReadingBook = (req, res) => {
  Models.ReadingBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const updateReadingBook = (req, res) => {
  Models.ReadingBooks.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const deleteReadingBook = (req, res) => {
  Models.ReadingBooks.destroy({
    where: { user_id: req.params.user_id, book_id: req.params.book_id },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};


module.exports = {
  getReadingBooks,
  getUsersReadingBooks,
  createReadingBook,
  updateReadingBook,
  deleteReadingBook,
};
