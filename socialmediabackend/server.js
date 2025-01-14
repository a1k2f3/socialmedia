import express from "express";
import connectDB from "./connection.js";
import authRoutes from "./modules/SignupApi.js";
import Login from "./modules/Login.js"
import post from "./modules/post.js"
import Comments from "./modules/Comment.js"
import find_user from "./modules/finduser.js"
import find_post from "./modules/getPost.js"
import fetchcomment from "./modules/fetchcomment.js"
import suggestion from "./modules/suggest.js"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from'cors'
const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, { cors:{
  origin:PORT,
  methods:[ "GET","POST"]
} });

app.use(express.json()); 
app.use(cors())
connectDB();
app.get('/',(req,res)=>{
  res.send('hey')
})  
app.use("/api", authRoutes);
app.use("/api", Login);
app.use("/api", post);
app.use("/api", find_user);
app.use("/api", suggestion);
app.use("/api",Comments)
app.use("/api",find_post)
app.use("/api",fetchcomment)
io.on("connection", (socket) => {
  console.log("user come in")
socket.on("disconnnect",()=>{
  console.log("user diconnected")
})
});
// httpServer.listen(3001);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});