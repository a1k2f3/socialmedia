import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Accounts from "../Schema/Signup.js";
import Search from "../Schema/searchdata.js";

const router = express.Router();

// Get the correct __dirname (because you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
router.use("/public", express.static(path.join(__dirname, "../../public"))); // Adjust path as per your project structure

router.post("/user", async (req, res) => {
  try {
    const {username,author_id}=req.body;
    if (!author_id||!username) {
      return res.status(400).json({ message: "Content, author ID, and userid are required" });
    }
    const user = await Accounts.find({username:{ $regex: username, $options: "i" }});
    
    await Search.create({
      author_id,
      username,
  })
    res.json(user);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json(error); // Return a proper error response
  }
});

export default router;
