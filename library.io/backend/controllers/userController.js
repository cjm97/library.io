'use strict';

const Models = require('../models');
const bcrypt = require('bcryptjs');

const getUsers = (res) => {
  Models.Users.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getUsersById = (req, res) => {
  Models.Users.findAll({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};
const createUsers = async (data, res) => {
  try {
    // Get user input by destructuring request body
    const { firstName, lastName, email, password } = data;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).json('All input is required');
    }

    // Validate if user exists in our database
    const oldUser = await Models.Users.findOne({ where: { email } });

    if (oldUser) {
      res.status(409).json({ result: 'User already exists. Please login' });
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Models.Users.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    res.status(200).json({ result: 'Success, user created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: 'ruh roh something went wrong: ' + error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Get user input from request body
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({ result: 'All input is required' });
    }
    // Validate if user exists in our database
    const user = await Models.Users.findOne({ where: { email: email } });

    // if they do exist, make sure their password matches - need to check encrypted version of password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token for use based on their id and email
      // const token = jwt.sign({ user_id: user.id, email }, process.env.JWT_KEY, {
      //   expiresIn: '2h',
      // });

      // send back logged in user details including token
      res.status(200).json({
        result: 'User successfully logged in',
        data: user,
        // token: token,
      });
    } else res.status(400).json({ result: 'Invalid user credentials' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err.message });
  }
};

const updateUsers = (req, res) => {
  Models.Users.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteUsers = (req, res) => {
  Models.Users.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getUsers,
  getUsersById,
  loginUser,
  createUsers,
  updateUsers,
  deleteUsers,
};
