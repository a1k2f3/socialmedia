import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Acount'},
    title: { type: String, required: true },
    content: { type: String, required:true },
    postId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    createdAt:{ type: Date, default: Date.now },
  });
const Postschema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: { type: String},
  author_id:{type: mongoose.Schema.Types.ObjectId,ref: 'Accounts', },
  likes: { type: mongoose.Schema.Types.ObjectId,ref:'Accounts'},
  comments:[commentSchema], 
},{
    timestamps: true, 
  });
export default mongoose.model("Post", Postschema);