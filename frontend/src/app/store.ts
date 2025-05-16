import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {albumReducer} from "../features/albums/albumSlice.ts";
import {artistReducer} from "../features/artists/artistSlice.ts";
import {trackReducer} from "../features/tracks/trackSlice.ts";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {usersReducer} from "../features/users/usersSlice.ts";
import {trackHistoryReducer} from "../features/trackHistory/trackHistorySlice.ts";

const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    albums: albumReducer,
    artists: artistReducer,
    tracks: trackReducer,
    trackHistory: trackHistoryReducer,
    users: persistReducer(usersPersistConfig, usersReducer)

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;