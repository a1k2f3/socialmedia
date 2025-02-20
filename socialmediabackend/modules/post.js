import express from "express";
import Post from "../Schema/Post.js";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();
// Serve static files from the 'public' directory
router.use(express.static('public'));
// Ensure the 'public/post' directory exists
const imagesDir = path.join('public','media');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// Route to handle post creation
router.post("/post", upload.single("media"),async (req, res) => {
  try {
    const { title, content, author_id } = req.body;
    const file = req.file;
    // Basic validation
    if (!content || !title ) {
      return res.status(400).json({ message: "Title, content, and author_id are required." });
    }
    // Create a new post in the database
    await Post.create({
      title,
      content,
      media: file ? file.filename : null,
      author_id,
      comments: [],
    });
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/post",async (req, res) => {
  try {
    const posts= await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
