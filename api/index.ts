import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistRouter from "./routers/artists";
import albumRouter from "./routers/albums";
import trackHistoryRouter from "./routers/trackHistories";
import usersRouter from "./routers/users";
import trackRouter from "./routers/tracks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/trackHistories', trackHistoryRouter);
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/hw-82');


    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

