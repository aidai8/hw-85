import express from 'express';
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {ArtistWithoutId} from "../types";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists= await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }

});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const newArtist: ArtistWithoutId = {
            artist_name: req.body.artist_name,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
        };
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default artistRouter;