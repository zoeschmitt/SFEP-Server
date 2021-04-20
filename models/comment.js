import mongoose from 'mongoose';
 
const commentSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    userName: String,
    userTitle: String,
  },
  { timestamps: true },
);
 
const Comment = mongoose.model('Comment', commentSchema);
 
export default Comment;