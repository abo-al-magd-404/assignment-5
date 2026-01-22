import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define(
  "User",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error(
              "Password length must be greater than 6 characters.",
            );
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },

  {
    validate: {
      checkNameLength() {
        if (this.name && this.name.length <= 2) {
          throw new Error("Name must be greater than 2 characters.");
        }
      },
    },
    timestamps: true,
  },
);
