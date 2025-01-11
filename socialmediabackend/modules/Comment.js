import express from 'express';
import Post from '../Schema/Post.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/post/comment/:postid', async (req, res) => {
    try {
        const { content, author_id ,title}=req.body; // Destructure content and author_id from body
        const { postid } = req.params; // Use the correct parameter name
             
        if (!content || !author_id || !postid) {
            return res.status(400).json({ message: "Content, author ID, and post ID are required" });
        }

        // Check if the post ID is valid
        if (!mongoose.Types.ObjectId.isValid(postid)) {
            return res.status(400).json({ message: "Invalid Post ID format" });
        }

        // Find the post by ID
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create the new comment
        const newComment = {
            author_id, // directly use author_id from the request body
            content,
            title,
            createdAt: new Date(),
        };

        // Push the new comment to the post's comments array
        post.comments.push(newComment);

        // Save the updated post
        await post.save();

        // Return a success response with the added comment
        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment, // Only return the added comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add comment', error });
    }
});
export default router;