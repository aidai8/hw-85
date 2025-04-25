import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Track} from "../../types";

interface TracksState {
    tracks: Track[];
    loading: boolean;
    error: string | null;
}

const initialState: TracksState = {
    tracks: [],
    loading: false,
    error: null
};

export const fetchTracks = createAsyncThunk<Track[], string>(
    'tracks/fetchByAlbum',
    async (albumId: string) => {
        const response = await axiosApi.get(`/tracks?album=${albumId}&sort=number`);
        return response.data;
    }
);

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.tracks = action.payload;
                state.loading = false;
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load tracks';
            });
    }
});

export const trackReducer = trackSlice.reducer;