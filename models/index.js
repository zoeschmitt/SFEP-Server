import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './user.js';
import Comment from './comment.js';
import Post from './post.js';

dotenv.config();

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true});
};
 
const models = { User, Comment, Post };
 
export { connectDb };
export default models;