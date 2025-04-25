import {configureStore} from "@reduxjs/toolkit";
import {albumReducer} from "../features/albums/albumSlice.ts";
import {artistReducer} from "../features/artists/artistSlice.ts";
import {trackReducer} from "../features/tracks/trackSlice.ts";

export const store = configureStore({
    reducer:{
        albums: albumReducer,
        artists: artistReducer,
        tracks: trackReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;