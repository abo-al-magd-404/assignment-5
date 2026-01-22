import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const result = await userService.signup(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.errors ? error.errors.map((e) => e.message) : error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const result = await userService.upsertUser(req.params.id, req.body);
  return res.status(result.status).json({ message: result.message });
});

router.get("/by-email", async (req, res) => {
  const { email } = req.query;
  const result = await userService.getUserByEmail(email);
  if (result.status === 404) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json({ user: result.user });
});

router.get("/:id", async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  if (result.status === 404) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result.user);
});

export default router;
