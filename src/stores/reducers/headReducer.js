import { createSlice } from '@reduxjs/toolkit';
import {
    downGradeHead,
    getHeadDetail,
    getHeads,
    nonActiveHead,
    updateHead,
} from '../thunks/headsThunk';

const initialState = {
    heads: [],
    head: {},
    status: 'idle', // idle | loading | success | failed
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
                state.status = 'success';
                state.heads = action.payload.data;
            })
            .addCase(getHeads.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Downgrade head
        builder
            .addCase(downGradeHead.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(downGradeHead.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(downGradeHead.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Non active head
        builder
            .addCase(nonActiveHead.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(nonActiveHead.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(nonActiveHead.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Get head detail
        builder
            .addCase(getHeadDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHeadDetail.fulfilled, (state, action) => {
                state.status = 'success';
                state.head = action.payload.data;
            })
            .addCase(getHeadDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Update head
        builder
            .addCase(updateHead.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateHead.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(updateHead.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = headSlice.actions;

export default headSlice.reducer;
