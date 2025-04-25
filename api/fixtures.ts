import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const [billieEilish, queen] = await Artist.create(
        {
            artist_name: 'Billie Eilish',
            image: "fixtures/billie.jpeg",
            description: 'Billie Eilish Pirate Baird Connell (born December 18, 2001) is an American singer-songwriter and musician.',
        },
        {
            artist_name: 'Queen',
            image: "fixtures/queen.jpeg",
            description: 'Queen is a British band that is considered one of the greatest rock bands in history.',
        },
    );

}