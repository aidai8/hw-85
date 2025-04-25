import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User ({
            username : req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({error: "Username and password are required"});
        return;
    }

    const user = await User.findOne({username: req.body.username});
    if (!user) {
        res.status(404).send({error: "User name nor found"});
        return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        res.status(400).send({error: 'Password is incorrect'});
        return;
    }

    user.generateToken();
    await user.save();

    res.send({message: 'Username and password are correct', user});
});

usersRouter.post('/secret', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: "No token present"});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: "Wrong token"});
        return;
    }

    res.send({
        message: 'Secret message',
        user: user.username,
    })
});

export default usersRouter;