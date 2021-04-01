import { Router } from 'express';
import PostsController from '../api/PostsController';
import UserController from '../api/userController';

const routes = Router();

routes.post('/api/createUser', UserController.create);
routes.post('/api/signin/:userId', UserController.signIn);
routes.get('/api/user/:userId', UserController.getUser);
routes.post('/api/update/:userId', UserController.update);
routes.post('/api/logout/:id', UserController.logout);

routes.get('/api/posts', PostsController.fetchPosts);
routes.post('/api/post/:userId', PostsController.makePost);
routes.get('/api/search/:query', PostsController.search);
routes.get('/api/discussion/:postId', PostsController.fetchDiscussion);
routes.post('/api/comment', PostsController.comment);
routes.delete('/api/deletePost/:postId', PostsController.deletePost);
routes.delete('/api/deleteComment/:commentId', PostsController.deleteComment);

export default routes;