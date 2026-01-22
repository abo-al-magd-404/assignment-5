import { NODE_ENV, port } from "../config/config.service.js";
import { checkDBConnection, syncConnection } from "./DB/connection.db.js";
import { UserModel } from "./DB/model/user.model.js";
import { PostModel } from "./DB/model/post.model.js";
import { CommentModel } from "./DB/model/comment.model.js";
import { commentRouter, userRouter } from "./modules/index.js";
import express from "express";
import { postRouter } from "./modules/index.js";

async function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());

  // DB
  await checkDBConnection();
  await syncConnection();

  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error,
      error_message:
        status == 500 && NODE_ENV == "production"
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
