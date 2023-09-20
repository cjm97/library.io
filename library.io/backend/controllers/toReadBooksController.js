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
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};


const getUsersToReadBooks = (req, res) => {
  // get specific user's books that match with their id requested
  Models.ToReadBooks.findAll({ where: { user_id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const createToReadBook = (req, res) => {
  Models.ToReadBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      //catch statement for incorrect information
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const updateToReadBook = (req, res) => {
  Models.ToReadBooks.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const deleteToReadBook = (req, res) => {
  Models.ToReadBooks.destroy({
    where: { user_id: req.params.user_id, book_id: req.params.book_id },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getToReadBooks,
  getUsersToReadBooks,
  createToReadBook,
  updateToReadBook,
  deleteToReadBook,
};
