export interface Artist {
    _id: string;
    artist_name: string;
    image: string | null;
    description?: string;
}

export interface Album {
    _id: string;
    album_name: string;
    artist: Artist | string;
    year: number;
    image: string | null;
}

export interface AlbumWithTracks extends Album {
    tracks: Track[];
}

export interface Track {
    _id: string;
    track_name: string;
    album: string | Album;
    duration: string;
    number: number;
}

export type AlbumMutation = Omit<Album, '_id'>;
export type TrackMutation = Omit<Track, '_id'>;

export interface ApiResponse<T> {
    data: T;
    message?: string;
}