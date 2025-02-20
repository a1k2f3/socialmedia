import mongoose from "mongoose";
const { Schema } = mongoose;

const Searchdata = new Schema({

  username: { type: String, required: true },
  
  author_id:{type: mongoose.Schema.Types.ObjectId,ref: 'Accounts', },

  
},{
    timestamps: true, 
  });
export default mongoose.model("Search", Searchdata);