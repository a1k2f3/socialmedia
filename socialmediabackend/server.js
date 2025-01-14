import express from "express";
import connectDB from "./connection.js";
import authRoutes from "./modules/SignupApi.js";
import Login from "./modules/Login.js"
import post from "./modules/post.js"
import Comments from "./modules/Comment.js"
import find_user from "./modules/finduser.js"
import find_post from "./modules/getPost.js"
import fetchcomment from "./modules/fetchcomment.js"
import cors from'cors'
const app = express();
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
app.use("/api",Comments)
app.use("/api",find_post)
app.use("/api",fetchcomment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});