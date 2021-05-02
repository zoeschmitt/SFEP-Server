import { Router } from 'express';
import PostsController from '../api/postsController.js';
import UserController from '../api/userController.js';
import { verifyToken } from '../services/tokenService.js';

const routes = Router();

// middleware - all of the below routes will check for auth
//routes.use('/api/update/:userId', verifyToken, UserController.update);
routes.use('/api/update/:userId', verifyToken);
routes.use('/api/post/:userId', verifyToken);
routes.post('/api/updateLikes/:userId', verifyToken);
routes.post('/api/updateCredibility/:userId', verifyToken);
routes.use('/api/comment', verifyToken);
routes.use('/api/deletePost/:postId', verifyToken);
routes.use('/api/deleteComment/:commentId', verifyToken);
routes.use('/api/logout/:userId', verifyToken);

routes.post('/api/createUser', UserController.create);
routes.post('/api/signin', UserController.signIn);
routes.get('/api/user/:userId', UserController.getUser);
routes.post('/api/update/:userId', UserController.update);
routes.post('/api/logout/:userId', UserController.logout);

routes.get('/api/posts', PostsController.fetchPosts);
routes.post('/api/post/:userId', PostsController.makePost);
routes.post('/api/updateLikes/:userId', PostsController.updatePostLikes);
routes.post('/api/updateCredibility/:userId', PostsController.updatePostCredibility);
routes.get('/api/search/:query', PostsController.search);
routes.get('/api/discussion/:postId', PostsController.fetchDiscussion);
routes.post('/api/comment', PostsController.comment);
routes.delete('/api/deletePost/:postId', PostsController.deletePost);
routes.delete('/api/deleteComment/:commentId', PostsController.deleteComment);

export default routes;