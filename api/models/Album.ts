import mongoose, {Types} from 'mongoose'
import Artist from "./Artist";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    album_name: {
        type: String,
        required: [true, 'Please enter an album name'],
        unique: true,
        validate: {
            validator: async (value: string) => {
                const album = await Album.findOne({album_name: value});
                if (album) return false;
                return true;
            },
            message: "Artist name is required",
        }
    },
    artist: {
      type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        validate: {
          validator: async (value: Types.ObjectId) => {
              if (!mongoose.Types.ObjectId.isValid(value)) return false;
              const artist = await Artist.findById(value);
              return !!artist;
              },
            message: "Artist not found",
        },
    },
    year: {
      type: Number,
      required: [true, 'Please enter a year'],
        validate: {
            validator: (value: number) => value >= 1900 && value <= new Date().getFullYear(),
            message: "Year must be between 1900 and current year",
        },
    },
    image: {
        type: String,
        required: false,
    },
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;