const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route');
const postsRouter = require('./posts.route');
const commentsRouter = require('./comments.route');
const likeRouter = require('./likes.route')

router.use('/',likeRouter, usersRouter, postsRouter, commentsRouter);

module.exports = router;