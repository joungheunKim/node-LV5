const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const LikeController = require('../controllers/likes.controller')
const likeController = new LikeController();

router.get('/like/posts',authMiddleware, likeController.getLikePost)
router.put('/like/:postId',authMiddleware, likeController.putLike)

module.exports = router;