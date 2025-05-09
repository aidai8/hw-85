import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const john = new User({
        username: "John",
        password: "123",
        role: "user",
        token: "user-token-" + Math.random().toString(36).substring(2)
    });
    john.generateToken();
    await john.save();

    const jane = new User({
        username: "Jane",
        password: "123",
        role: "admin",
        token: "admin-token-" + Math.random().toString(36).substring(2)
    });
    john.generateToken();
    await jane.save();

    const [billieEilish, queen] = await Artist.create(
        {
            artist_name: 'Billie Eilish',
            image: "fixtures/billie.jpeg",
            description: 'Billie Eilish Pirate Baird Connell (born December 18, 2001) is an American singer-songwriter and musician.',
            isPublished: true,
            user: jane._id
        },
        {
            artist_name: 'Queen',
            image: "fixtures/queen.jpeg",
            description: 'Queen is a British band that is considered one of the greatest rock bands in history.',
            isPublished: true,
            user: jane._id
        }
    );

    const hiddenArtist = await Artist.create({
        artist_name: 'Hidden Band',
        image: "fixtures/unknown.jpeg",
        description: 'Not published',
        isPublished: false,
        user: john._id
    });

    const [whenWeAllFallAsleep, happierThanEver] = await Album.create(
        {
            album_name: 'When We All Fall Asleep, Where Do We Go?',
            artist: billieEilish._id,
            year: 2019,
            image: "fixtures/whenWeAllFallAsleep.jpeg",
            isPublished: true,
            user: jane._id
        },
        {
            album_name: 'Happier Than Ever',
            artist: billieEilish._id,
            year: 2021,
            image: "fixtures/happierThanEver.jpeg",
            isPublished: true,
            user: jane._id
        },
    );

    const [aNightAtTheOpera, theGame] = await Album.create(
        {
            album_name: 'A Night at the Opera',
            artist: queen._id,
            year: 1975,
            image: "fixtures/nightAtOpera.jpeg",
            isPublished: true,
            user: jane._id
        },
        {
            album_name: 'The Game',
            artist: queen._id,
            year: 1980,
            image: "fixtures/theGame.jpeg",
            isPublished: true,
            user: jane._id
        }
    );

    const unpublishedAlbum = await Album.create(
        {
            album_name: 'Unreleased Tracks',
            artist: hiddenArtist._id,
            year: 2025,
            image: "fixtures/noImage.jpeg",
            isPublished: false,
            user: john._id
        }
    );

    await Track.create(
        {
            track_name: "Secret Demo 1",
            album: unpublishedAlbum._id,
            duration: "2:45",
            number: 1,
            isPublished: false,
            user: john._id
        },
        {
            track_name: "Work in Progress",
            album: unpublishedAlbum._id,
            duration: "3:12",
            number: 2,
            isPublished: false,
            user: john._id
        },
        {
            track_name: "Unfinished Track",
            album: unpublishedAlbum._id,
            duration: "1:58",
            number: 3,
            isPublished: false,
            user: john._id
        }
    );

    await Track.create(
        {
            track_name: "bad guy",
            album: whenWeAllFallAsleep._id,
            duration: "3:14",
            number: 1,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "xanny",
            album: whenWeAllFallAsleep._id,
            duration: "4:04",
            number: 2,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "you should see me in a crown",
            album: whenWeAllFallAsleep._id,
            duration: "3:01",
            number: 3,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "all the good girls go to hell",
            album: whenWeAllFallAsleep._id,
            duration: "2:49",
            number: 4,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "wish you were gay",
            album: whenWeAllFallAsleep._id,
            duration: "3:42",
            number: 5,
            isPublished: true,
            user: jane._id
        }
    );

    await Track.create(
        {
            track_name: "Getting Older",
            album: happierThanEver._id,
            duration: "4:04",
            number: 1,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "I Didn't Change My Number",
            album: happierThanEver._id,
            duration: "2:38",
            number: 2,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Billie Bossa Nova",
            album: happierThanEver._id,
            duration: "3:16",
            number: 3,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "my future",
            album: happierThanEver._id,
            duration: "3:30",
            number: 4,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Oxytocin",
            album: happierThanEver._id,
            duration: "3:30",
            number: 5,
            isPublished: true,
            user: jane._id
        }
    );

    await Track.create(
        {
            track_name: "Death on Two Legs",
            album: aNightAtTheOpera._id,
            duration: "3:43",
            number: 1,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Lazing on a Sunday Afternoon",
            album: aNightAtTheOpera._id,
            duration: "1:08",
            number: 2,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "I'm in Love with My Car",
            album: aNightAtTheOpera._id,
            duration: "3:05",
            number: 3,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "You're My Best Friend",
            album: aNightAtTheOpera._id,
            duration: "2:50",
            number: 4,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Bohemian Rhapsody",
            album: aNightAtTheOpera._id,
            duration: "5:55",
            number: 5,
            isPublished: true,
            user: jane._id
        }
    );

    await Track.create(
        {
            track_name: "Play the Game",
            album: theGame._id,
            duration: "3:30",
            number: 1,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Dragon Attack",
            album: theGame._id,
            duration: "4:18",
            number: 2,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Another One Bites the Dust",
            album: theGame._id,
            duration: "3:36",
            number: 3,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Need Your Loving Tonight",
            album: theGame._id,
            duration: "2:48",
            number: 4,
            isPublished: true,
            user: jane._id
        },
        {
            track_name: "Crazy Little Thing Called Love",
            album: theGame._id,
            duration: "2:43",
            number: 5,
            isPublished: true,
            user: jane._id
        }
    );

    await db.close();
};

run().catch(console.error);