import { createSlice } from '@reduxjs/toolkit';
import {
    createMotivation,
    getAllMotivation,
    getMotivationById,
} from '../thunks/motivationThunk';

const initialState = {
    motivations: [],
    motivation: {},
    status: 'idle',
    error: null,
};

const motivationSlice = createSlice({
    name: 'motivation',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // getAllMotivation
        builder
            .addCase(getAllMotivation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllMotivation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.motivations = action.payload.data;
            })
            .addCase(getAllMotivation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // createMotivation
        builder
            .addCase(createMotivation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createMotivation.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(createMotivation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // getMotivationById
        builder
            .addCase(getMotivationById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getMotivationById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.motivation = action.payload.data;
            })
            .addCase(getMotivationById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default motivationSlice.reducer;
