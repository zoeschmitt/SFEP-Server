import axios from 'axios';
import models from '../models/index.js';

// This class handles all user based mongo requests
class UserService {

    static async createUser(req, password) {
        const user = new models.User({
            name: req.body.name,
            password: password,
            email: req.body.email,
            title: req.body.title,
            loggedIn: true
        });

        await user.save();

        return user;
    }

    static async findUserByEmail(email) {
        const user = await models.User.findOne({ email: email });
        return user;
    }

    static async findUserById(id) {
        const user = await models.User.findById(id);
        return user;
    }

    static async updateUser(id, req, password) {
        const user = await models.User.findByIdAndUpdate(id, {
            name: req.body.name,
            password: password,
            email: req.body.email,
            title: req.body.title,
            loggedIn: true
        });

        return user;
    }

    static async logoutUser(id) {
        const user = await models.User.findByIdAndUpdate(id, {
            loggedIn: false
        });

        return user;
    }
}

export default UserService;