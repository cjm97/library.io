'use strict';
const Users = require('./users'); //require the model
const ReadBooks = require('./readbooks');
const ReadingBooks = require('./readingbooks');
const ToReadBooks = require('./toreadbooks');
const Books = require('./books');

async function init() {
  await Users.sync(); //sync the model
  await Books.sync();
  await ReadBooks.sync();
  await ReadingBooks.sync();
  await ToReadBooks.sync();
}

init();
module.exports = {
  Users, //export the model
  ReadBooks,
  ReadingBooks,
  ToReadBooks,
  Books,
};
