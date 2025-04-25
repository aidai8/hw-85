import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Album, AlbumMutation} from "../../types";
import {RootState} from "../../app/store.ts";

interface AlbumsState {
    albums: Album[];
    loading: boolean;
    error: string | null;
}

const initialState: AlbumsState = {
    albums: [],
    loading: false,
    error: null
};

export const selectAlbumById = (id: string) => (state: RootState) =>
    state.albums.albums.find((album: Album) => album._id === id);

export const fetchAlbums = createAsyncThunk<Album[], string>(
    'albums/fetchByArtist',
    async (artistId: string) => {
        const response = await axiosApi.get(`/albums?artist=${artistId}&sort=-year`);
        return response.data;
    }
);

export const createAlbum = createAsyncThunk<Album, AlbumMutation>(
    'albums/create',
    async (albumData) => {
        const response = await axiosApi.post('/albums', albumData);
        return response.data;
    }
);

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.albums = action.payload;
                state.loading = false;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load albums';
            })
            .addCase(createAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create album';
            });
    }
});

export const albumReducer = albumSlice.reducer;