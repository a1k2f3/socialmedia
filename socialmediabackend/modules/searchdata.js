import express from 'express';
import cors from 'cors';
import Search from '../Schema/searchdata.js';
const router = express.Router();
router.use(express.json());
router.use(cors()); // Apply CORS globally (better in app.js or server.js)
router.get('/search', async (req, res) => {
  try {
    const { author_id} = req.body; 
    if (!author_id) {
      return res.status(400).json({ message: "Content, author ID, and post ID are required" });
    }
    await Search.find({
        author_id        
    })
    res.status(201).json({
      message: 'search successfully',
       // Returning the new comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add search', error });
  }
});
export default router;
