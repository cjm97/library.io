'use strict';
const axios = require('axios');
const Models = require('../models');
const { Op } = require('sequelize');

const getReadBooks = (res) => {
  // for all users?
  Models.ReadBooks.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const getUsersReadBooks = (req, res) => {
  // get specific user's books that match with their id requested
  Models.ReadBooks.findAll({ where: { user_id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};



const createReadBook = (req, res) => {
  Models.ReadBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, data: err.message });
    });
};

const getUsersReadBook = (req, res) => {
  Models.ReadBooks.findAll({
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

const updateReadBook = (req, res) => {
  Models.ReadBooks.update(req.body, {
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

const deleteReadBook = (req, res) => {
  Models.ReadBooks.destroy({
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
  getReadBooks,
  getUsersReadBooks,
  getUsersReadBook,
  createReadBook,
  updateReadBook,
  deleteReadBook,
};
