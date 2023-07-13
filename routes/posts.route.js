const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const PostsController = require('../controllers/posts.controller')
const postsController = new PostsController();

router.post('/posts',authMiddleware, postsController.createPost);
router.get('/posts', postsController.getPosts)
router.get('/posts/:postId', postsController.getPost)
router.put('/posts/:postId',authMiddleware, postsController.updatePost)
router.delete('/posts/:postId',authMiddleware, postsController.deletePost)


module.exports = router;