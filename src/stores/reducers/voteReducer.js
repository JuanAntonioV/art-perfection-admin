import { createSlice } from '@reduxjs/toolkit';
import { checkHeadCanVote, createVote } from '../thunks/voteThunk';

const initialState = {
    votes: [],
    vote: {},
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    error: null,
};

const voteSlice = createSlice({
    name: 'vote',
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

        // checkHeadCanVote
        builder
            .addCase(checkHeadCanVote.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(checkHeadCanVote.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(checkHeadCanVote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default voteSlice.reducer;
