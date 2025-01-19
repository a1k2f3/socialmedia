import express from "express";
import bcrypt from "bcryptjs";
import Accounts from "../Schema/Signup.js"; // Verify this path
import jwt from "jsonwebtoken";
const router = express.Router();
export default(io)=>{

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const existingUser = await Accounts.findOne({ email });
    if (!existingUser) {
      return res.status(400).send("Invalid email or password");
    }
    
    const validation = await bcrypt.compare(password, existingUser.password);
    if (!validation) {
      return res.status(400).send("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET || "your_jwt_secret", // Replace with your secret
      { expiresIn: '1h' } // Adjust the expiration time to something reasonable like 1 hour
    );
    res.status(200).json({ message: "User login successful",  user: existingUser, token, id:existingUser.id});
    io.emit("user logeind",{id:existingUser.id, email:existingUser.email})
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});
return router;
}

