export interface Artist {
    _id: string;
    artist_name: string;
    image: string | null;
    description?: string;
}

export type ArtistWithoutId = Omit<Artist, '_id'>;

export interface Album {
    _id: string;
    album_name: string;
    artist: string | Artist;
    year: number;
    image: string | null;
}

export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    _id: string;
    track_name: string;
    album: string | Album;
    duration: string;
}

export type TrackWithoutId = Omit<Track, '_id'>;

export interface TrackFilter {
  album?: mongoose.Types.ObjectId | string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}