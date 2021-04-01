import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    title: String,
  },
  { timestamps: true },
);
 
const User = mongoose.model('User', userSchema);
 
export default User;