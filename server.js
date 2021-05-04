import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(cors());
import models, { connectDb } from './models/index.js';
const port = process.env.port || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

connectDb().then(async () => {
  app.listen(port, () =>
    console.log(`App listening on port ${port}`),
  );

});

// Use below functions to create dummy information

// function createDummyUsers() {
//   console.log('creating');
//   const fakeUsers = ['Linda Miller', 'Jacob Michaels', 'Matthew Garza', 'Anthony Cook', 'Mary Smith'];
//   const fakeEmails = ['lindamiller@gmail.com', 'jacobmichaels@gmail.com', 'matthewgarza@gmail.com', 'anthonycook@gmail.com', 'marysmith@gmail.com'];

//   for (var i in fakeUsers) {
//     console.log('creating user');
//     createUsersAndPosts(fakeUsers[i], fakeEmails[i]);
//   }
// }

// const createUsersAndPosts = async (userName, email) => {
//   console.log('creating2');
//   try {
//     const user1 = new models.User({
//       name: userName,
//       password: 'password',
//       email: email,
//       title: 'Scientist'
//     });

//     await user1.save();

//     const post = new models.Post({
//       userId: user1.id,
//       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//       title: 'Lorem ipsum',
//       userName: user1.name,
//       userTitle: user1.title,
//       likes: 5,
//       dislikes: 0,
//       credibleVotes: 3,
//       uncredibleVotes: 3,
//     });

//     // const comment = new models.Comment({
//     //   postId: post.id,
//     //   userId: user1.id,
//     //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     //   userName: user1.id
//     // });


//     await post.save();
//   } catch (e) {
//     console.log(e);
//   }

// }

// createDummyUsers();

export default app;