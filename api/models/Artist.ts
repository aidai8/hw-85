import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async (value: string) => {
              const artist = await Artist.findOne({artist_name: value});
              if (artist) return false;
              return true;
            },
            message: "Artist name is required",
        }
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        default: '',
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;