import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import {AlbumWithoutId} from "../types";
import mongoose from "mongoose";


const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
    try {
        const artist_Id = req.query.artist as string;

        if (artist_Id && !mongoose.Types.ObjectId.isValid(artist_Id)) {
            res.status(400).send({ error: "Invalid Artist ID" });
            return;
        }

        const filter = artist_Id ? { artist: artist_Id } : {};
        const albums = await Album.find(filter).populate("artist", "-image -description");
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumRouter.get("/:id", async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist", "-image -description");
        if (!album) {
            res.status(404).send({ error: "Album not found" });
            return;
        }
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
    try {
        const newAlbum: AlbumWithoutId = {
            album_name: req.body.album_name,
            artist: req.body.artist,
            year: req.body.year,
            image: req.file ? "images/" + req.file.filename : null,
        };

        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

export default albumRouter;