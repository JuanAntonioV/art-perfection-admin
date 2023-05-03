import { createSlice } from '@reduxjs/toolkit';
import {
    checkHeadCanVote,
    createVote,
    getAllUserVotedToday,
} from '../thunks/voteThunk';

const initialState = {
    votes: [],
    vote: {},
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    userNotVoted: [],
    userVoted: [],
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

        // getAllUserVotedToday
        builder
            .addCase(getAllUserVotedToday.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllUserVotedToday.fulfilled, (state, action) => {
                state.status = 'success';
                state.userNotVoted = action.payload.data.user_not_voted;
                state.userVoted = action.payload.data.user_voted;
            })
            .addCase(getAllUserVotedToday.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default voteSlice.reducer;
