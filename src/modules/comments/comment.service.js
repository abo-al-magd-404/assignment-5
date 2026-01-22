import { CommentModel, UserModel, PostModel } from "../../DB/model/index.js";
import { Op } from "sequelize";

export const createBulkComments = async (comments) => {
  await CommentModel.bulkCreate(comments);
  return { status: 201, message: "comments created." };
};

export const updateComment = async (commentId, userId, content) => {
  const comment = await CommentModel.findByPk(commentId);
  if (!comment) return { status: 404, message: "comment not found." };

  if (comment.userId !== parseInt(userId)) {
    return {
      status: 403,
      message: "You are not authorized to update this comment.",
    };
  }

  comment.content = content;
  await comment.save();
  return { status: 200, message: "Comment updated." };
};

export const findOrCreateComment = async (data) => {
  const [comment, created] = await CommentModel.findOrCreate({
    where: {
      postId: data.postId,
      userId: data.userId,
      content: data.content,
    },
    defaults: data,
  });
  return { status: 200, comment, created };
};

export const searchComments = async (word) => {
  const { count, rows } = await CommentModel.findAndCountAll({
    where: {
      content: { [Op.like]: `%${word}%` },
    },
  });
  if (count === 0) return { status: 404, message: "no comments found." };
  return { status: 200, count, comments: rows };
};

export const getRecentComments = async (postId) => {
  const comments = await CommentModel.findAll({
    where: { postID: postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  return { status: 200, comments };
};

export const getCommentDetails = async (id) => {
  const comment = await CommentModel.findByPk(id, {
    include: [
      { model: UserModel, attributes: ["id", "name", "email"] },
      { model: PostModel, attributes: ["id", "title", "content"] },
    ],
  });
  if (!comment) return { status: 404, message: "no comment found" };
  return { status: 200, comment };
};
