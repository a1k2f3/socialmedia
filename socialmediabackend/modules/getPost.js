import express from "express";
import Post from "../Schema/Post.js";
const router = express.Router();
// Route to handle post creation
router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
