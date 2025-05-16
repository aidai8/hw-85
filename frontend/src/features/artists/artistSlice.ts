import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store.ts";

interface Artist {
    _id: string;
    artist_name: string;
    image: string | null;
}

interface ArtistsState {
    artists: Artist[];
    loading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    loading: false,
};

export const selectArtistById = (id: string) => (state: RootState) =>
    state.artists.artists.find((artist: Artist) => artist._id === id);

export const fetchArtists = createAsyncThunk("artists/fetchAll", async () => {
    const response = await axiosApi.get("/artists");
    return response.data;
});

export const createArtist = createAsyncThunk("artists/create", async (artistData: FormData) => {
        const response = await axiosApi.post("/artists", artistData);
        return response.data;
    }
);

const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.artists = action.payload;
                state.loading = false;
            })
            .addCase(createArtist.fulfilled, (state, action) => {
                state.artists.push(action.payload)
            })
    },
});

export const artistReducer = artistSlice.reducer;