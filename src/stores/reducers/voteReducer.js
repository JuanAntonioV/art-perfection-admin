import { createSlice } from '@reduxjs/toolkit';
import { createVote } from '../thunks/voteThunk';

const initialState = {
    votes: [],
    vote: {},
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    error: null,
};

const voteSlice = createSlice({
    name: 'votes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // createVote
        builder
            .addCase(createVote.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createVote.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(createVote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default voteSlice.reducer;
