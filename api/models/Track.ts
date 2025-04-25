import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
    track_name: {
        type: String,
        required: [true, 'Track name is required'],
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        validate: {
            validator: (value: string) => /^(\d{1,2}):(\d{2})$/.test(value),
            message: "Duration must be in format MM:SS or H:MM",
        },
    }
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;