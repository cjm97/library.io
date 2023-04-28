'use strict';
const axios = require('axios');
const Models = require('../models');
const { Op } = require('sequelize');

const getReadBooks = (res) => {
  Models.ReadBooks.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getReadBookById = (req, res) => {
  Models.Books.findAll({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createReadBook = (req, res) => {
  Models.ReadBooks.create(req)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateReadBook = (req, res) => {
  Models.ReadBooks.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteReadBook = (req, res) => {
  Models.ReadBooks.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getReadBooks,
  getReadBookById,
  createReadBook,
  updateReadBook,
  deleteReadBook,
};
