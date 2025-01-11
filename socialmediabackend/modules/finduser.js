import express from "express";
// import Signup from "../Schema/Signup";
import Accounts from "../Schema/Signup.js"
const router = express.Router()
router.get("/user", async (req, res) => {
    try {
      const user = await Accounts.find(); // Assuming you meant Signup, not Accounts
      res.json(user);
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(500).json(error); // Return a proper error response
    }
  });
  export default router;
  