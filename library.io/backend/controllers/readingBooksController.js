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
      throw err;
    });
};

const getReadingBookById = (req, res) => {
  Models.Books.findAll({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getUsersReadingBooks = (req, res) => {
  // get specific user's books that match with their id requested
  Models.ReadingBooks.findAll({ where: { user_id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createReadingBook = (req, res) => {
  Models.ReadingBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateReadingBook = (req, res) => {
  Models.ReadingBooks.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteReadingBook = (req, res) => {
  Models.ReadingBooks.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getReadingBooks,
  getUsersReadingBooks,
  getReadingBookById,
  createReadingBook,
  updateReadingBook,
  deleteReadingBook,
};
