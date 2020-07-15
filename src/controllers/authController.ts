import { Response } from 'express';
import * as bcrypt from "bcryptjs";
import * as HttpStatusCodes from "http-status-codes";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

import Payload from "../types/Payload";
import Request from "../types/Request";
import User from "../models/user";

export class AuthController {

    public async loggedInUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.userId).select("-password");
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const errors = [{ msg: "Invalid Credentials" }]

            let user = await User.findOne({ username });
            user = JSON.parse(JSON.stringify(user))

            if (!user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json(errors);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json(errors);
            }

            const payload: Payload = {
                userId: user._id,
                email: user.email
            };

            const profile = _.omit(user, ['_id', 'password', 'username', '__v', 'email', 'created_date'])

            const jwtSecret = 'jwtSecretToken';
            const jwtExpiration = 360000;

            jwt.sign(payload, jwtSecret,
                { expiresIn: jwtExpiration },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, profile });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    public async register(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username
            };

            const errors = [{ msg: "User already exist" }]

            let user = await User.findOne({ username });
            if (user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json(errors);
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            newUser['password'] = hashed;
            user = new User(newUser);

            await user.save();

            const payload: Payload = {
                userId: user._id,
                email: user.email
            };

            const profile = _.omit(newUser, ['password', 'username'])

            const jwtSecret = 'jwtSecretToken';
            const jwtExpiration = 360000;

            jwt.sign(payload, jwtSecret,
                { expiresIn: jwtExpiration },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, profile });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}