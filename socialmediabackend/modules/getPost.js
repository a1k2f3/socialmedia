import express from "express";
import Post from "../Schema/Post.js";
const router = express.Router();
// Route to handle post creation
router.get("/post",async (req, res) => {
  try {
    const { title, content, author_id } = req.body;
    // Basic validation
    if (!content || !title ) {
      return res.status(400).json({ message: "Title, content, and author_id are required." });
    }
   
   const posts= await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
