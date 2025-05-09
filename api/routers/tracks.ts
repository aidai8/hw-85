import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {Album, Artist, TrackFilter} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";


const trackRouter = express.Router();

interface PopulatedAlbum extends Omit<Album, 'artist'> {
    artist: Artist;
}

trackRouter.get("/", async (req, res, next) => {
    try {
        const album_Id = req.query.album as string;
        const artist_Id = req.query.artist as string;

        if (album_Id && !mongoose.Types.ObjectId.isValid(album_Id)) {
            res.status(400).send({ error: "Invalid album id" });
            return;
        }

        if (artist_Id && !mongoose.Types.ObjectId.isValid(artist_Id)) {
            res.status(400).send({ error: "Invalid artist id" });
            return;
        }

        let filter: TrackFilter = {};
        if (album_Id) {
            filter.album = album_Id;
        }

        let tracks = await Track.find(filter).populate<{album: PopulatedAlbum}>({
            path: "album",
            populate: {path: "artist"}
        });

        if (artist_Id) {
            tracks = tracks.filter(track => {
                return track.album.artist._id.toString() === artist_Id;
            });
        }
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

trackRouter.post("/", auth, async (req, res, next) => {
    try {
        const newTrack = {
            track_name: req.body.track_name,
            album: req.body.album,
            duration: req.body.duration,
            isPublished: false
        };

        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

trackRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({message: 'Track not found'});
            return;
        }

        await Track.findByIdAndDelete(req.params.id);
        res.send({message: 'Track deleted successfully'});
        return;
    } catch (e) {
        next(e);
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({message: 'Track not found'});
            return;
        }

        track.isPublished = !track.isPublished;
        await track.save();
        res.send(track);
        return;
    } catch (e) {
        next(e);
    }
});

export default trackRouter;