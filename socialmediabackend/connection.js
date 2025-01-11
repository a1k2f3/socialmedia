import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const dburl=process.env.DATA_BASE_URL
const Connection=async()=>{
try {
    await mongoose.connect('mongodb://localhost:27017/SOCIALMEDIA');
  console.log("databsae cnnection succesfull")
} catch (error) {
    console.log(error);
   }
}
export default Connection;