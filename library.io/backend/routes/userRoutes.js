const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/', (req, res) => {
  Controllers.userController.getUsers(res);
});

router.get('/:id', (req, res) => {
  console.log(res.body);
  console.log(req.params.id);
  Controllers.userController.getUsersById(req, res);
});

router.post('/create', (req, res) => {
  Controllers.userController.createUsers(req.body, res);
});

router.post('/logIn', (req, res) => {
  Controllers.userController.loginUser(req, res);
});


router.put('/:id', (req, res) => {
  Controllers.userController.updateUsers(req, res);
});

router.delete('/:id', (req, res) => {
  Controllers.userController.deleteUsers(req, res);
});

module.exports = router;
