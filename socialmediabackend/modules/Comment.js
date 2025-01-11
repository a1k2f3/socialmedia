import express from 'express';
import Post from '../Schema/Post.js';
import mongoose from 'mongoose';
const router = express.Router();
router.post('/post/comment', async (req, res) => {
    try {
        const { content, author_id, postId } = req.body;
        if (!content || !author_id || !postId) {
            return res.status(400).json({ message: "Content, author ID, and post ID are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID format" });
        }
       const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = {
            author_id, // directly use author_id
            content,
            createdAt: new Date(),
        };
post.comments.push(newComment);
        await post.save();
        res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add comment', error });
    }
});
export default router;