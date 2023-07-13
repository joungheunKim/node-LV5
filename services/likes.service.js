const LikeRepository = require('../repositories/likes.repository');
const PostRepository = require('../repositories/posts.repository');

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  putLike = async ({ userId, postId }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글을 찾을 수 없습니다.' };

    const findLike = await this.likeRepository.findOne({ UserId: userId, PostId: postId });
    if (!findLike) {
      await this.likeRepository.createOne({ UserId: userId, PostId: postId });
      return { code: 200, message: '좋아요를 추가하였습니다.' };
    } else {
      await this.likeRepository.deleteOne({ UserId: userId, PostId: postId });
      return { code: 200, message: '좋아요를 삭제하였습니다.' };
    }
  };

  getLikePost = async ({ userId, postId }) => {
    const findLike = await this.likeRepository.findAll({ UserId:userId })
    if (!findLike) throw { code:404 , message:'좋아요한 게시글이 없습니다.'}
    return {
        code: 201,
        result: findLike
        .sort((a, b) => b.like - a.like)
        .map((x)=>{
            return {
                postId: x.Post.postId,
                nickname: x.User.nickname,
                title: x.Post.title,
                content: x.Post.content,
                like: x.like,
                createAt: x.Post.createAt
            }
        })
    }
};
}

module.exports = LikeService;
