import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './user';
import Comment from './comment';
import Post from './post';

dotenv.config();

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL);
};
 
const models = { User, Comment, Post };
 
export { connectDb };
export default models;