import mongoose from 'mongoose';
 
import User from './user';
import Comment from './comment';
import Post from './post';

DB_URL = 'mongodb+srv://zoe:F7vHwnL5iBjd@sfep-db.t6rsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL);
};
 
const models = { User, Comment, Post };
 
export { connectDb };
export default models;