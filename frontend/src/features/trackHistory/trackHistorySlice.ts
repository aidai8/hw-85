import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TrackHistoryItem} from "../../types";
import {RootState} from "../../app/store.ts";

interface TrackHistoryState {
    items: TrackHistoryItem[];
    loading: boolean;
    error: string | null;
}

const initialState: TrackHistoryState = {
    items: [],
    loading: false,
    error: null
};

export const fetchTrackHistory = createAsyncThunk(
    'trackHistory/fetch',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.users.user?.token;

        if (!token) {
            return thunkAPI.rejectWithValue('User not logged in');
        }

        try {
            const response = await axiosApi.get('/trackHistories', {
                headers: { 'Authorization': token }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to load history');
        }
    }
);

const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrackHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrackHistory.fulfilled, (state, { payload }) => {
                state.items = payload;
                state.loading = false;
            })
            .addCase(fetchTrackHistory.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to load history';
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;