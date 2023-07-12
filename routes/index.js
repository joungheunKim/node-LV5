const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route');
const postsRouter = require('./posts.route');

router.use('/', usersRouter, postsRouter);

module.exports = router;