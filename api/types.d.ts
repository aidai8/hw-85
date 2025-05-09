export interface Artist {
    _id: string;
    artist_name: string;
    image: string | null;
    description?: string;
    isPublished: boolean;
}

export type ArtistWithoutId = Omit<Artist, '_id'>;

export interface Album {
    _id: string;
    album_name: string;
    artist: string | Artist;
    year: number;
    image: string | null;
    isPublished: boolean;
}

export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    _id: string;
    track_name: string;
    album: string | Album;
    duration: string;
    isPublished: boolean;
}

export type TrackWithoutId = Omit<Track, '_id'>;

export interface TrackFilter {
  album?: mongoose.Types.ObjectId | string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface TrackHistory extends Document {
    user: Types.ObjectId;
    track: Types.ObjectId;
    artist: Types.ObjectId;
    datetime: Date;
}