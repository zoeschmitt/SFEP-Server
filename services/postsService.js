import models from '../models/index.js';

class PostsService {

    static async getAllPosts() {
        var posts = await models.Post.find({});
        return posts != null ? posts : 'No posts found';
    }

    static async createPost(req, userId) {
        const post = new models.Post({
            userId: userId,
            title: req.body.title,
            body: req.body.body,
            userName: req.body.userName,
            userTitle: req.body.userTitle,
            likes: [],
            dislikes: [],
            credibleVotes: [],
            uncredibleVotes: []
        });

        await post.save();

        return post;
    }

    static async updateLikes(req, userId) {

        const post = await models.Post.findById(req.body.postId);
        console.log(post);
        if (req.body.updateType == -1) {
            //dislike
            //check if already disliked
            if (post.dislikes.includes(userId)) return;
            //check if in likes, if so then remoce
            if (post.likes.includes(userId)) {
                post.likes.remove(userId)
            }
            post.dislikes.push(userId)
        } else {
            //like
            //check if already liked
            if (post.likes.includes(userId)) return;
            //check if in likes, if so then remoce
            if (post.dislikes.includes(userId)) {
                post.dislikes.remove(userId)
            }
            post.likes.push(userId)
        }
        await post.save();
    }

    static async updateCredibility(req, userId) {

        const post = await models.Post.findById(req.body.postId);
        console.log(post);
        if (req.body.updateType == -1) {
            //dislike
            //check if already disliked
            if (post.uncredibleVotes.includes(userId)) return;
            //check if in likes, if so then remoce
            if (post.credibleVotes.includes(userId)) {
                post.credibleVotes.remove(userId)
            }
            post.uncredibleVotes.push(userId)
        } else {
            //like
            //check if already liked
            if (post.credibleVotes.includes(userId)) return;
            //check if in likes, if so then remoce
            if (post.uncredibleVotes.includes(userId)) {
                post.uncredibleVotes.remove(userId)
            }
            post.credibleVotes.push(userId)
        }
        await post.save();
    }

    static async searchPosts(query) {
        var posts = [];
        var filteredPosts = [];
        var i = 0;
        posts = await models.Post.find({});
        for (i = 0; i < posts.length; i++) {
            var regex = new RegExp(query, 'gi');
            if (regex.test(posts[i].body) || regex.test(posts[i].title)) {
                filteredPosts.push(posts[i]);
            }
        }

        return filteredPosts.length > 0 ? filteredPosts : 'No posts found';
    }

    static async getDiscussion(postId) {
        var discussion = await models.Comment.find({ postId: postId });
        return discussion != null ? discussion : 'No discussion yet';
    }

    static async createComment(req) {
        const comment = new models.Comment({
            postId: req.body.postId,
            userId: req.body.userId,
            text: req.body.text,
            userName: req.body.userName,
            userTitle: req.body.userTitle,
        });

        await comment.save();

        return comment;
    }

    static async deletePost(postId) {
        const res = await models.Post.deleteOne({ _id: postId });
        if (res.ok == 1) {
            return true
        } else {
            return false
        }
    }

    static async deleteComment(commentId) {
        const res = await models.Comment.deleteOne({ _id: commentId });
        if (res.ok == 1) {
            return true
        } else {
            return false
        }
    }
}

export default PostsService;