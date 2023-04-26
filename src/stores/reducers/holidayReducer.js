import { createSlice } from '@reduxjs/toolkit';
import {
    createHolidayThunk,
    deleteHolidayThunk,
    getAllHolidayThunk,
} from '../thunks/holidayThunk';

const initialState = {
    holidays: [],
    status: 'idle', // idle | loading | success | failed
    error: null,
};

const holidaySlice = createSlice({
    name: 'holiday',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // get all holiday
        builder
            .addCase(getAllHolidayThunk.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllHolidayThunk.fulfilled, (state, action) => {
                state.status = 'success';
                state.holidays = action.payload.data;
            })
            .addCase(getAllHolidayThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // create holiday
        builder
            .addCase(createHolidayThunk.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createHolidayThunk.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(createHolidayThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // delete holiday
        builder
            .addCase(deleteHolidayThunk.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteHolidayThunk.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(deleteHolidayThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default holidaySlice.reducer;
