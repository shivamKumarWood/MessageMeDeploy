import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
}, {
  timestamps: true, // this will automatically add the createdAt and the updatedAt field
});
const User = mongoose.model("User", userSchema);
export default User;