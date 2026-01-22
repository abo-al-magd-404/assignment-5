import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";
import { CommentModel } from "./comment.model.js";

UserModel.hasMany(PostModel, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
PostModel.belongsTo(UserModel, { foreignKey: "userId" });

PostModel.hasMany(CommentModel, {
  foreignKey: "postId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
CommentModel.belongsTo(PostModel, { foreignKey: "postId" });

UserModel.hasMany(CommentModel, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
CommentModel.belongsTo(UserModel, { foreignKey: "userId" });

export { UserModel, PostModel, CommentModel };
