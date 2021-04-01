import axios from 'axios';

class PostsService {

    static async getAllPosts() {
        var posts = [];

        for (var tag in tags) {
            const res = await axios.get('https://api.hatchways.io/assessment/blog/posts', {
                headers: {
                    'Content-Type': 'application/json',
                }, params: { tag: tag }
            });
            posts.push(res);
        }

        return posts != null ? posts : 'No posts found';
    }

    static async createPost(req) {

    }

    static async searchPost(req) {

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