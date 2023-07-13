const LikeService = require('../services/likes.service');

class LikeController {
    likeService = new LikeService();

    putLike = async (req, res) => {
    try {
      const { userId } = res.locals.user      
      const { postId } = req.params;
      const { code, message } = await this.likeService.putLike({userId,postId});
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };


  getLikePost = async (req, res) => {
    try {
      const { userId } = res.locals.user      
      const { postId } = req.params;
      const { code, result } = await this.likeService.getLikePost({userId,postId});
      return res.status(code).json({ likePost: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };
}

module.exports = LikeController