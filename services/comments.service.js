const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  findAllComment = async ({ postId }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글이 존재하지 않습니다.' };

    const result = await this.commentRepository.findAll();

    return {
      code: 201,
      result: result.map((x) => {
        return {
          commentId: x.commentId,
          nickname: x.User.nickname,
          UserId: x.UserId,
          PostId: x.PostId,
          comment: x.comment,
        };
      }),
    };
  };

  findComment = async ({ postId, commentId }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글이 존재하지 않습니다.' };

    const result = await this.commentRepository.findOne({ commentId });
    if (!result) throw { code: 404, message: '조회가능한 댓글이 없습니다.' };

    return {
        code: 201,
        result: {
            commentId: result.commentId,
            nickname: result.User.nickname,
            UserId: result.UserId,
            PostId: result.PostId,
            comment: result.comment
        }

        
      };
  };

  createComment = async ({ userId, postId, comment }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글이 존재하지 않습니다.' };

    if (comment === '') throw { code: 412, message: '댓글을 작성해주세요' };
    await this.commentRepository.createOne({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return { code: 200, message: '댓글 작성이 완료되었습니다.' };
  };

  updateComment = async ({ userId, postId, commentId, comment }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글이 존재하지 않습니다.' };

    const findComment = await this.commentRepository.findOne({ commentId });
    if (!findComment) throw { code: 404, message: '수정가능한 댓글이 존재하지 않습니다.' };

    const findCommentUserId = findComment.UserId;
    if (userId !== findCommentUserId)
      throw { code: 401, message: '댓글수정은 댓글작성자만 가능합니다.' };

    await this.commentRepository.updateOne({ comment }, [
      { UserId: userId },
      { PostId: postId },
    ]);
    return { code: 200, message: '댓글수정이 완료되었습니다.' };
  };

  deleteComment = async ({ userId, postId, commentId }) => {
    const findPost = await this.postRepository.findOne({ postId });
    if (!findPost) throw { code: 404, message: '게시글이 존재하지 않습니다.' };

    const findComment = await this.commentRepository.findOne({ commentId });
    if (!findComment) throw { code: 404, message: '삭제가능한 댓글이 존재하지 않습니다.' };

    const findCommentUserId = findComment.UserId;
    if (userId !== findCommentUserId)
      throw { code: 401, message: '댓글삭제는 댓글작성자만 가능합니다.' };
    
    await this.commentRepository.deleteOne({commentId})
    return  { code: 200, message: '댓글삭제가 완료되었습니다.' };
  }
}

module.exports = CommentService;
