import { Router } from "express";
import * as commentService from "./comment.service.js";

const router = Router();

router.post("/", async (req, res) => {
  const result = await commentService.createBulkComments(req.body.comments);
  return res.status(result.status).json({ message: result.message });
});

router.patch("/:commentId", async (req, res) => {
  const { userId, content } = req.body;
  const result = await commentService.updateComment(
    req.params.commentId,
    userId,
    content,
  );
  return res.status(result.status).json({ message: result.message });
});

router.post("/find-or-create", async (req, res) => {
  const result = await commentService.findOrCreateComment(req.body);
  return res
    .status(result.status)
    .json({ comment: result.comment, created: result.created });
});

router.get("/search", async (req, res) => {
  const result = await commentService.searchComments(req.query.word);
  if (result.status === 404)
    return res.status(404).json({ message: result.message });
  return res
    .status(200)
    .json({ count: result.count, comments: result.comments });
});

router.get("/newest/:postId", async (req, res) => {
  const result = await commentService.getRecentComments(req.params.postId);
  return res.status(200).json(result.comments);
});

router.get("/details/:id", async (req, res) => {
  const result = await commentService.getCommentDetails(req.params.id);
  if (result.status === 404)
    return res.status(404).json({ message: result.message });
  return res.status(200).json(result.comment);
});

export default router;
