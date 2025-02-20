import express from "express";
import connectDB from "./connection.js";
import authRoutes from "./modules/SignupApi.js";
import loginRoutes from "./modules/Login.js";
import postRoutes from "./modules/post.js";
import commentRoutes from "./modules/Comment.js";
import findUserRoutes from "./modules/finduser.js";
import findPostRoutes from "./modules/getPost.js";
import fetchCommentRoutes from "./modules/fetchcomment.js";
import search from "./modules/searchdata.js";
import suggestionRoutes from "./modules/suggest.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
// Socket.io server setup with CORS for front-end origin
const io = new Server(httpServer,{ 
  cors: {
    origin: "http://localhost:3000", // Change this to your front-end URL
    methods: ["GET", "POST","PUT"]
  }
});
app.use(express.json({origin:'http://localhost:3000'}));
app.use(cors());
connectDB();
// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/api", authRoutes(httpServer));
app.use("/api", loginRoutes(io));
app.use("/api",postRoutes);
app.use("/api", commentRoutes);
app.use("/api", findUserRoutes);
app.use("/api", suggestionRoutes);
app.use("/api", findPostRoutes);
app.use("/api", fetchCommentRoutes);
app.use("/api", search);
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
