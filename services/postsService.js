import axios from 'axios';
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
        posts = await models.Post.find({});
        for (i = 0; i < posts.length; i++) {
            var regex = new RegExp(query, 'gi');
            if (regex.test(posts[i].body) || regex.test(posts[i].title)) {
                filteredPosts.push(posts[i]);
            }
        }

        return filteredPosts.length > 0 ? filteredPosts : 'No posts found';
    }

    static async getDiscussion() {

    }

    static async createComment(req) {

    }

    static async deletePost(req, res) {

    }

    static async deleteComment(req, res) {

    }
}

export default PostsService;