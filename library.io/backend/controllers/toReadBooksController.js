'use strict';
const axios = require('axios');
const Models = require('../models');
const { Op } = require('sequelize');

const getToReadBooks = (res) => {
  Models.ToReadBooks.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getToReadBookById = (req, res) => {
  Models.Books.findAll({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getUsersToReadBooks = (req, res) => {
  // get specific user's books that match with their id requested
  Models.ToReadBooks.findAll({ where: { user_id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createToReadBook = (req, res) => {
  Models.ToReadBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateToReadBook = (req, res) => {
  Models.ToReadBooks.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteToReadBook = (req, res) => {
  Models.ToReadBooks.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getToReadBooks,
  getToReadBookById,
  getUsersToReadBooks,
  createToReadBook,
  updateToReadBook,
  deleteToReadBook,
};
