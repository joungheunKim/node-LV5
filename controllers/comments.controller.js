const CommentService = require('../services/comments.service');

class CommentController {
  commentService = new CommentService();

  getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const { code, result } = await this.commentService.findAllComment({postId});
      return res.status(code).json({ comment:result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  getComment = async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { code, result } = await this.commentService.findComment({ postId, commentId });
      return res.status(code).json({ comment: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  createComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { comment } = req.body;
      const { postId } = req.params;
      const { code, message } = await this.commentService.createComment({
        userId,
        postId,
        comment,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  updateComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body
      const { code, message } = await this.commentService.updateComment({ userId, postId, commentId, comment})
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;   
      const { code, message } = await this.commentService.deleteComment({ userId, postId, commentId })   
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };
}

module.exports = CommentController;
