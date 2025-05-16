import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistRouter from "./routers/artists";
import albumRouter from "./routers/albums";
import trackHistoryRouter from "./routers/trackHistories";
import usersRouter from "./routers/users";
import trackRouter from "./routers/tracks";
import config from "./config";
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/trackHistories', trackHistoryRouter);
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

