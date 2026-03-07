import mongoose from "mongoose";

const User_Schema = mongoose.Schema({
  user_name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
  },
  role: {
    type: String,
    enum: ["candidate", "interviewer"],
    default:"candidate"
  },
});

const user_model=mongoose.model("User",User_Schema);
export default user_model;