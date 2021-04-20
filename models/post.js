import mongoose from 'mongoose';
 
const postSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String,
    userName: String,
    userTitle: String,
    likes: Number,
    dislikes: Number,
    credibleVotes: Number,
    uncredibleVotes: Number
  },
  { timestamps: true },
);
 
const Post = mongoose.model('Post', postSchema);
 
export default Post;