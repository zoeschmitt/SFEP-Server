import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String,
    userName: String,
    userTitle: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },],
    credibleVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },],
    uncredibleVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },]
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);

export default Post;