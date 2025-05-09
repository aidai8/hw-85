import express from 'express';
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {ArtistWithoutId} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

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
            isPublished: false,
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

artistRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({message: 'Artist not found'});
            return;
        }

        await Artist.findByIdAndDelete(req.params.id);
        res.send({message: 'Artist deleted successfully'});
        return;
    } catch (e) {
        next(e);
    }
});

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({message: 'Artist not found'});
            return;
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();
        res.send(artist);
        return;
    } catch (e) {
        next(e);
    }
});

export default artistRouter;