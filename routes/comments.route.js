const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const CommentController = require('../controllers/comments.controller')
const commentController = new CommentController();

router.post('/posts/:postId/comment',authMiddleware, commentController.createComment);
router.get('/posts/:postId/comment', commentController.getComments)
router.get('/posts/:postId/comment/:commentId', commentController.getComment)
router.put('/posts/:postId/comment/:commentId',authMiddleware, commentController.updateComment)
router.delete('/posts/:postId/comment/:commentId',authMiddleware, commentController.deleteComment)


module.exports = router;