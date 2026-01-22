// import { PostModel } from "../../DB/model/post.model.js";
// import { UserModel } from "../../DB/model/user.model.js";
// import { CommentModel } from "../../DB/model/comment.model.js";
import { UserModel, PostModel, CommentModel } from "../../DB/model/index.js";
import { Sequelize } from "sequelize";

export const createPost = async (postData) => {
  const newPost = new PostModel(postData);
  await newPost.save();
  return { status: 201, message: "Post created successfully." };
};

export const deletePost = async (postId, userId) => {
  const post = await PostModel.findByPk(postId);
  if (!post) {
    return { status: 404, message: "Post not found." };
  }
  if (post.userId !== parseInt(userId)) {
    return {
      status: 403,
      message: "You are not authorized to delete this post.",
    };
  }
  await post.destroy();
  return { status: 200, message: "Post deleted." };
};

export const getPostsDetails = async () => {
  const posts = await PostModel.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: UserModel,
        attributes: ["id", "name"],
      },
      {
        model: CommentModel,
        attributes: ["id", "content"],
      },
    ],
  });
  return { status: 200, posts };
};

export const getPostsCommentCount = async () => {
  const posts = await PostModel.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"],
    ],
    include: [
      {
        model: CommentModel,
        attributes: [],
      },
    ],
    group: [Sequelize.col("Post.id")],
  });
  return { status: 200, posts };
};
