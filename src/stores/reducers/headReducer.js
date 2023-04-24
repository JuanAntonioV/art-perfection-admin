import { createSlice } from '@reduxjs/toolkit';
import { getHeads } from '../thunks/headsThunk';

const initialState = {
    heads: [],
    head: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const headSlice = createSlice({
    name: 'head',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Get heads
        builder
            .addCase(getHeads.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHeads.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.heads = action.payload.data;
            })
            .addCase(getHeads.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = headSlice.actions;

export default headSlice.reducer;
