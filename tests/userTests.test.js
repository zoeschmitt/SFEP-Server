import app from '../server.js';
import mongoose from 'mongoose';
import models from '../models/index.js';
import request from 'supertest';

var testUser;
var testUserId;
var testUserToken;

beforeAll((done) => {
    mongoose.connect(process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterAll(async (done) => {
    await models.User.findByIdAndDelete(testUserId);
    await mongoose.connection.close();
    done();
});

/// USER TESTS
describe('User Tests', function () {

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

    test('GET /api/user', async (done) => {
        request(app)
            .get(`/api/user/${testUserId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.user).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: expect.any(String),
                        password: expect.any(String),
                        email: expect.any(String),
                        title: expect.any(String),
                    }),
                );
                return done();
            });
    });

    test('POST /api/logout', async (done) => {
        request(app)
            .post(`/api/logout/${testUserId}`)
            .set({ 'auth-token': testUserToken })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test('POST /api/signin', async (done) => {
        request(app)
            .post('/api/signin')
            .send({ email: testUser.email, password: 'mypassword' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.user).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: testUser.name,
                        password: expect.any(String),
                        email: testUser.email,
                        title: testUser.title,
                    }),
                );
                testUserToken = res.body.token;
                expect(res.body.token).toEqual(expect.any(String));
                return done();
            });
    });

    test('POST /api/update', async (done) => {
        request(app)
            .post(`/api/update/${testUserId}`)
            .set({ 'auth-token': testUserToken })
            .send({ name: testUser.name, email: testUser.email, password: 'mypassword', title: 'Professor & Scientist' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.user).toEqual(
                    expect.objectContaining({
                        _id: testUserId,
                        name: testUser.name,
                        password: expect.any(String),
                        email: testUser.email,
                        title: testUser.title,
                    }),
                );
                return done();
            });
    });
});