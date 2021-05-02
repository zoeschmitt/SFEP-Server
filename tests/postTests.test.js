import app from '../server.js';
import mongoose from 'mongoose';
import models from '../models/index.js';
import request from 'supertest';

var testUser;
var testUserId;
var testUserToken;
var testPost;
var testComment;

beforeAll(async (done) => {
    mongoose.connect(process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterAll(async (done) => {
    await models.User.findByIdAndDelete(testUserId);
    await mongoose.connection.close();
    done();
});

/// POST TESTS
describe('Post Tests', function () {

    test('POST /api/posts', async (done) => {
        request(app)
            .get('/api/posts')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                return done();
            });
    });

    test('POST /api/createUser', async (done) => {
        request(app)
            .post('/api/createUser')
            .send({ name: 'John Smith', email: 'johnsmith@gmail.com', password: 'mypassword', title: 'Professor' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                testUserId = res.body.user._id;
                testUser = res.body.user;
                expect(res.body.user).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: 'John Smith',
                        password: expect.any(String),
                        email: 'johnsmith@gmail.com',
                        title: 'Professor',
                        loggedIn: true
                    }),
                );
                testUserToken = res.body.token;
                expect(res.body.token).toEqual(expect.any(String));
                return done();
            });
    });

    test('POST /api/post', async (done) => {
        request(app)
            .post(`/api/post/${testUserId}`)
            .set({ 'auth-token': testUserToken })
            .send({ title: "Deep Learning", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", userName: testUser.name, userTitle: testUser.title })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                testPost = res.body.post;
                expect(res.body.post).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        userId: testUserId,
                        title: "Deep Learning",
                        userName: testUser.name,
                        userTitle: testUser.title
                    }),
                );
                return done();
            });
    });

    test('POST /api/search', async (done) => {
        request(app)
            .get(`/api/search/${'deep'}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(Array.isArray(res.body.posts)).toBeTruthy();
                return done();
            });
    });

    test('POST /api/comment', async (done) => {
        request(app)
            .post(`/api/comment`)
            .set({ 'auth-token': testUserToken })
            .send({ postId: testPost._id, userId: testUserId, text: "Lorem ipsum dolor sit amet", userName: testUser.name, userTitle: testUser.title })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                testComment = res.body.comment;
                expect(res.body.comment).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        postId: testPost._id,
                        userId: testUserId,
                        text: "Lorem ipsum dolor sit amet",
                        userName: testUser.name,
                        userTitle: testUser.title
                    }),
                );
                return done();
            });
    });

    test('GET /api/discussion', async (done) => {
        request(app)
            .get(`/api/discussion/${testPost._id}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(Array.isArray(res.body.discussion)).toBeTruthy();
                return done();
            });
    });

    test('POST /api/updateLikes', async (done) => {
        request(app)
            .post(`/api/updateLikes/${testUserId}`)
            .set({ 'auth-token': testUserToken })
            .send({ postId: testPost._id, updateType: 1 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test('POST /api/updateCredibility', async (done) => {
        request(app)
            .post(`/api/updateCredibility/${testUserId}`)
            .set({ 'auth-token': testUserToken })
            .send({ postId: testPost._id, updateType: 1 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test('DEL /api/deleteComment', async (done) => {
        request(app)
            .delete(`/api/deleteComment/${testComment._id}`)
            .set({ 'auth-token': testUserToken })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test('DEL /api/deletePost', async (done) => {
        request(app)
            .delete(`/api/deletePost/${testPost._id}`)
            .set({ 'auth-token': testUserToken })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});