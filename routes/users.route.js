const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller')
const usersController = new UsersController();

router.post('/login', usersController.loginUser);
router.post('/signup', usersController.createUser)

module.exports = router;