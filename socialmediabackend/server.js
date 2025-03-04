import express from "express";
import connectDB from "./connection.js";
import authRoutes from "./modules/SignupApi.js";
import loginRoutes from "./modules/Login.js";
import postRoutes from "./modules/post.js";
import commentRoutes from "./modules/Comment.js";
import findUserRoutes from "./modules/finduser.js";
import findPostRoutes from "./modules/getPost.js";
import fetchCommentRoutes from "./modules/fetchcomment.js";
import suggestionRoutes from "./modules/suggest.js";
import searchhistory from "./modules/searchdata.js"
import { createServer } from "http";
import { Server } from "socket.io";
import acounts from "./modules/Alluser.js"
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
app.use(express.static("public"))
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
app.use("/api", loginRoutes(io),express.static('public/images'));
app.use("/api",postRoutes,express.static('public/media'));
app.use("/api", commentRoutes);
app.use("/api", findUserRoutes);
app.use("/api", suggestionRoutes);
app.use("/api", findPostRoutes,express.static('public/media'));
app.use("/api", fetchCommentRoutes);
app.use("/api", acounts);
app.use("/api", searchhistory);
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
