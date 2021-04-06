import PostsService from "../services/postsService.js";

class PostsController {

    static async fetchPosts(req, res) {
        // validate the request has a tag
        if (req.query.tags == null) {
            return res.status(400).json({
                msg: 'You must include a search tag'
            });
        }
        // try to get all posts from api, send in res
        try {
            const blogPosts = await PostsService.getAllPosts(req);
            return res.status(200).json({
                blogPosts,
                msg: `All blog posts with tag ${req.query.tag}`
            });
        } catch (e) {
            return res.status(404).json({
                msg: `Could not fetch blog posts. ${e}`
            });
        }

    }

    static async makePost(req, res) {

    }

    static async search(req, res) {

    }

    static async fetchDiscussion(req, res) {
        //use selected posts id

    }

    static async comment(req, res) {

    }

    static async deletePost(req, res) {

    }

    static async deleteComment(req, res) {

    }

}

export default PostsController;