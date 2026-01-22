import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";

export class CommentModel extends Model {}

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },

  {
    sequelize,
    modelName: "Comment",
    timestamps: true,
  },
);
