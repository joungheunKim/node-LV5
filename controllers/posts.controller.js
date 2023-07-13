const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  getPosts = async (req, res) => {
    try {
      const { code, result } = await this.postService.findAllPost();
      return res.status(code).json({ posts: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  getPost = async (req, res) => {
    try {
      const { postId } = req.params
      const { code, result } = await this.postService.findPost({postId});
      return res.status(code).json({ posts: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { userId } = res.locals.user
        const { code, message } = await this.postService.createPost({ userId, title, content })
        return res.status(code).json({ message });
    } catch (err) {
        if (err.code) return res.status(err.code).json({ message: err.message });
        console.error(err);
        res.status(500).send('알 수 없는 에러가 발생');
      }
  }

  updatePost = async (req, res) => {
    try{
        const { title, content } = req.body;
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { code, message } = await this.postService.updatePost({ postId, userId, title, content })
        return res.status(code).json({ message });
    }catch (err) {
        if (err.code) return res.status(err.code).json({ message: err.message });
        console.error(err);
        res.status(500).send('알 수 없는 에러가 발생');
      }
  }

  deletePost = async (req, res) => {
    try{
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { code, message } = await this.postService.deletePost({ postId, userId })
    return res.status(code).json({ message });
    }catch (err) {
        if (err.code) return res.status(err.code).json({ message: err.message });
        console.error(err);
        res.status(500).send('알 수 없는 에러가 발생');
      }
  }
}

module.exports = PostController;
