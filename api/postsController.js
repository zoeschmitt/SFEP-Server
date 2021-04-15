import PostsService from "../services/postsService.js";
import jwt from 'jsonwebtoken';
import { postValidator } from '../validations/userValidation.js';

class PostsController {

    static async fetchPosts(req, res) {
        try {
            const posts = await PostsService.getAllPosts();
            return res.status(200).json({ posts });
        } catch (e) {
            return res.status(404).json({
                msg: `Could not fetch posts. ${e}`
            });
        }
    }

    static async makePost(req, res) {
        //auth and user id in param
        try {
            //verifying request query 
            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            //verifying request body 
            const { error } = postValidator(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const post = await PostsService.createPost(req, req.params.userId);

            return res.status(200).json({
                post: post,
                msg: `post successfully created`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not create post: ${e}`
            });
        }
    }

    static async search(req, res) {
        //qeury param = search
        try {
            //verifying request query 
            if (req.params.query == undefined) {
                return res.status(400).json({ error: 'No search query specified' });
            }

            const posts = await PostsService.searchPosts(req.params.query);

            return res.status(200).json({ posts: posts, });
        } catch (e) {
            return res.status(400).json({
                msg: `error searching posts: ${e}`
            });
        }
    }

    static async fetchDiscussion(req, res) {
        // posts id in param

    }

    static async comment(req, res) {
        //auth
    }

    static async deletePost(req, res) {
        //auth and post id in param
    }

    static async deleteComment(req, res) {
        //auth and comment id in param
    }

}

export default PostsController;