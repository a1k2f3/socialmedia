import mongoose from "mongoose";
const { Schema } = mongoose;
const SignupSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number },
  date_of_birth: { type: Date },
  password: { type: String, required: true },
  country: { type: String },
  image: { type: String },
  Userbio: { type: String }
});
export default mongoose.model("Accounts", SignupSchema);