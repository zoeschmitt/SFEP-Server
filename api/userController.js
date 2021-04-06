import UserService from "../services/userService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { newUserValidation, returningUserValidation } from '../validations/userValidation.js';

class UserController {

    static async create(req, res) {
        try {
            //verifying request body 
            const { error } = newUserValidation(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            //encrypting password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const newUser = await UserService.createUser(req, password);

            //creating token for authenticated use of website
            const token = jwt.sign({
                name: newUser.name,
                id: newUser._id,
            },
                process.env.TOKEN_SECRET
            );

            return res.status(200).json({
                user: newUser,
                token: token,
                msg: `User created`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not create user: ${e}`
            });
        }
    }

    static async signIn(req, res) {
        try {
            //verifying request body 
            const { error } = returningUserValidation(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            //finding matching email
            const user = await UserService.findUserByEmail(req.body.email);
            if (!user) return res.status(400).json({ error: "Incorrect Email" });

            //verifying password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).json({ error: "Incorrect Password" });

            //creating token for authenticated use of website
            const token = jwt.sign({
                name: user.name,
                id: user._id,
            },
                process.env.TOKEN_SECRET
            );

            return res.status(200).json({
                user,
                token,
                msg: `Signed In`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not sign in user: ${e}`
            });
        }
    }

    static async getUser(req, res) {
        try {
            //verifying request query 
            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            //finding matching email
            const user = await UserService.findUserById(req.params.userId);
            if (!user) return res.status(400).json({ error: "Incorrect Email" });

            return res.status(200).json({
                user,
                msg: `User found`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not find user: ${e}`
            });
        }
    }

    static async update(req, res) {
        try {
            //verifying request body 
            const { error } = newUserValidation(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            //encrypting password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            const user = await UserService.updateUser(req.params.userId, req.body, password)

            return res.status(200).json({
                user,
                msg: `User updated`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not update user: ${e}`
            });
        }
    }

    //MAKE SURE TO DELETE JWT ON FRONTEND
    static async logout(req, res) {
        try {
            //verifying request query 
            if (req.params.userId == undefined) {
                return res.status(400).json({ error: 'No userId specified' });
            }

            const user = await UserService.updateUser(req.params.userId);

            return res.status(200).json({
                user,
                msg: `User logged out`
            });
        } catch (e) {
            return res.status(400).json({
                msg: `Could not update user: ${e}`
            });
        }
    }

}

export default UserController;