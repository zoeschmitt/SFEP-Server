import PostsService from "../services/postsService.js";
import { commentValidator, postValidator } from '../validations/postValidation.js';

class PostsController {

    static async fetchPosts(req, res) {
        try {
            const posts = await PostsService.getAllPosts();
            return res.status(200).json({ posts });
        } catch (e) {
            return res.status(404).json({
                error: `Could not fetch posts. ${e}`
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
                error: `Could not create post: ${e}`
            });
        }
    }

    static async updatePostLikes(req, res) {
        //auth and user id in param
        try {
            //verifying request query 
            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            if (req.body.postId == null || req.body.updateType == null) {
                return res.status(400).json({ error: 'Invalid Request Body' });
            }

            await PostsService.updateLikes(req, req.params.userId);

            return res.status(200).json({
                msg: `updated successfully`
            });
        } catch (e) {
            return res.status(400).json({
                error: `update failed: ${e}`
            });
        }
    }

    static async updatePostCredibility(req, res) {
        //auth and user id in param
        try {
            //verifying request query 
            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            if (req.body.postId == null || req.body.updateType == null) {
                return res.status(400).json({ error: 'Invalid Request Body' });
            }

            await PostsService.updateCredibility(req, req.params.userId);

            return res.status(200).json({
                msg: `updated successfully`
            });
        } catch (e) {
            return res.status(400).json({
                error: `update failed: ${e}`
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
                error: `error searching posts: ${e}`
            });
        }
    }

    static async fetchDiscussion(req, res) {
        // posts id in param
        try {
            //verifying request query 
            if (req.params.postId == undefined) {
                return res.status(400).json({ error: 'No postId specified' });
            }

            const comments = await PostsService.getDiscussion(req.params.postId);

            return res.status(200).json({ discussion: comments });
        } catch (e) {
            return res.status(400).json({
                error: `error finding discussion: ${e}`
            });
        }
    }

    static async comment(req, res) {
        //auth
        try {
            //verifying request body 
            const { error } = commentValidator(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const comment = await PostsService.createComment(req);

            return res.status(200).json({
                comment: comment,
                msg: `comment successfully created`
            });
        } catch (e) {
            return res.status(400).json({
                error: `Could not create comment: ${e}`
            });
        }
    }

    static async deletePost(req, res) {
        //auth and post id in param
        try {
            //verifying request query 
            if (req.params.postId == undefined) {
                return res.status(400).json({ error: 'No postId specified' });
            }

            const deleted = await PostsService.deletePost(req.params.postId);

            if (deleted) {
                return res.status(200).json({ status: 'successfully deleted post' });
            } else {
                return res.status(400).json({ error: 'could not find post, check postId' });
            }
            
        } catch (e) {
            return res.status(400).json({
                error: `error deleting post: ${e}`
            });
        }
    }

    static async deleteComment(req, res) {
        //auth and comment id in param
        try {
            //verifying request query 
            if (req.params.commentId == undefined) {
                return res.status(400).json({ error: 'No commentId specified' });
            }

            const deleted = await PostsService.deleteComment(req.params.postId);

            if (deleted) {
                return res.status(200).json({ status: 'successfully deleted comment' });
            } else {
                return res.status(400).json({ error: 'could not find comment, check commentId' });
            }
            
        } catch (e) {
            return res.status(400).json({
                error: `error deleting comment: ${e}`
            });
        }
    }

}

export default PostsController;