import express from 'express';
import Post from '../Schema/Post.js';
import mongoose from 'mongoose';
import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors()); // Apply CORS globally (better in app.js or server.js)

router.post('/post/comment/:postId', async (req, res) => {
  try {
    const { content, author_id, title } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!content || !postId || !author_id) {
      return res.status(400).json({ message: "Content, author ID, and post ID are required" });
    }

    // Validate postId format
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    // Find the post by postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create the new comment
    const newComment = {
      author_id,
      content,
      title,
      postId,
      createdAt: new Date(),
    };

    // Push the new comment into the post's comments array
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    // Return the added comment or success message
    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,  // Returning the new comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add comment', error });
  }
});

export default router;
