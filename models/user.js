import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      min: 6,
      max: 255,
    },
    title: String,
    loggedIn: Boolean,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;