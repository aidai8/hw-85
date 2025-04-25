import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            res.status(401).send({error: "No token provided"});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: "Invalid token"});
            return;
        }

        const trackId = req.body.track;
        const track = await Track.findById(trackId);

        if (!track) {
            res.status(404).send({error: "Track not found"});
            return;
        }

        const history = new TrackHistory({
            user: user._id,
            track: track._id,
        });
        await history.save();
        res.send({message: "Track added to history", history});
    } catch (error) {
        next(error);
    }
});

trackHistoryRouter.get('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            res.status(401).send({error: "No token provided"});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: "Invalid token"});
            return;
        }

        const histories = await TrackHistory.find({user: user._id})
            .sort({datetime: -1})
            .populate({
                path: "track",
                populate: {
                    path: "album",
                    populate: {path: "artist"},
                },
            });
        res.send(histories);
    } catch (error) {
        next(error);
    }
});

export default trackHistoryRouter;