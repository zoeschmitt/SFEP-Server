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
            likes: 0,
            dislikes: 0,
            credibleVotes: 0,
            uncredibleVotes: 0
        });

        await post.save();

        return post;
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