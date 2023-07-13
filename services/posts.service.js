const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const result = await this.postRepository.findAll();

    return {
      code: 201,
      result: result
        .sort((a, b) => b.createAt - a.createAt)
        .map((posts) => {
          return {
            postId: posts.postId,
            nickname: posts.User.nickname,
            title: posts.title,
            content: posts.content,
            likes: posts.like,
            createAt: posts.createAt,
          };
        }),
    };
  };

  findPost = async ({ postId }) => {
    const result = await this.postRepository.findOne({ postId });

    if (!result) throw { code: 404, message: '게시글이 존재하지 않습니다' };

    return {
      code: 200,
      result: {
        postId: result.postId,
        nickname: result.User.nickname,
        title: result.title,
        content: result.content,
        likes: result.like,
        createAt: result.createAt,
      },
    };
  };

  createPost = async ({ userId, title, content }) => {
    await this.postRepository.createOne({ UserId: userId, title, content });
    return { code: 200, message: '게시글 작성이 완료되었습니다.' };
  };

  updatePost = async ({postId, userId, title, content}) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw ({ code: 404, message:'게시글이 존재하지 않습니다'})
  
    const findPostUserId = findPost.UserId
    if (userId !== findPostUserId) throw ({ code: 401, message:'게시글 수정은 작성자만 가능합니다.'});

    await this.postRepository.updateOne({ title: title, content: content }, [{ postId: postId }, { UserId: userId }])
    return { code: 200, message: '게시글 수정이 완료되었습니다.' }
  };

  deletePost = async ({postId, userId}) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw ({ code: 404, message:'게시글이 존재하지 않습니다'})

    const findPostUserId = findPost.UserId
    if (userId !== findPostUserId) throw ({ code: 401, message:'게시글 삭제는 작성자만 가능합니다.'});

    await this.postRepository.deleteOne({ postId })
    return { code: 200, message: '게시글 삭제가 완료되었습니다.' }
  }
}

module.exports = PostService;
