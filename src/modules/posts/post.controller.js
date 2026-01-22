import { Router } from "express";
import * as postService from "./post.service.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await postService.createPost(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.delete("/:postId", async (req, res) => {
  const { userId } = req.body;
  const result = await postService.deletePost(req.params.postId, userId);
  return res.status(result.status).json({ message: result.message });
});

router.get("/details", async (req, res) => {
  const result = await postService.getPostsDetails();
  return res.status(result.status).json(result.posts);
});

router.get("/comment-count", async (req, res) => {
  const result = await postService.getPostsCommentCount();
  return res.status(result.status).json(result.posts);
});

export default router;
