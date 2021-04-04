import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const app = express();
import models, { connectDb } from './models';
const port = process.env.port || 8000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', routes);

connectDb().then(async () => {
    app.listen(port, () =>
      console.log(`App listening on port ${port}!`),
    );
    const fakeUsers = ['Linda Miller', 'Jacob Michaels', 'Matthew Garza', 'Anthony Cook', 'Mary Smith'];
    for (var i in 5) {
      createUsersAndPosts(fakeUsers[i]);
    }
  });

  const createUsersAndPosts = async (userName) => {
    const user1 = new models.User({
      name: userName,
      password: 'password',
      email: 'testingemail@gmail.com',
      title: 'Scientist'
    });
   
    const post = new models.Post({
      userId: user1.id,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: 'Lorem ipsum',
      userName: user1.name,
      userTitle: user1.title,
      likes: 5,
      dislikes: 0,
      credibleVotes: 3,
      uncredibleVotes: 3,
    });

    // const comment = new models.Comment({
    //   postId: post.id,
    //   userId: user1.id,
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    //   userName: user1.id
    // });
   
    await user1.save();
    await post.save();    
  }

export default app;