import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Accounts from "../Schema/Signup.js";

const router = express.Router();

// Get the correct __dirname (because you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
router.use("/public", express.static(path.join(__dirname, "../../public"))); // Adjust path as per your project structure

router.get('/user', async (req, res) => {
    const query = req.query.query; // Get the query parameter
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
  
    try {
      const users = await Accounts.find({ username: { $regex: query, $options: "i" } }); // Case-insensitive search
      const usernames = users.map((user) => user.username); // Extract usernames
      res.json(usernames); // Send the list of usernames as suggestions
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });
  

export default router;
