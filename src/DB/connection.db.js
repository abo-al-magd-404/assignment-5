import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from "../../config/config.service.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: 3306,
});

export const checkDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const syncConnection = async () => {
  try {
    await sequelize.sync({
      alter: true,
      // force: true,
    });
    console.log("Connection SYNC has been established successfully.");
  } catch (error) {
    console.error("Unable to SYNC to the database:", error);
  }
};
