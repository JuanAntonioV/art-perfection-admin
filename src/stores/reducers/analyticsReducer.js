import { createSlice } from '@reduxjs/toolkit';
import { getGlobalAnalytics } from '../thunks/analyticsThunk';

const initialState = {
    analytics: [],
    employeeAnalytics: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Get global analytics
        builder
            .addCase(getGlobalAnalytics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGlobalAnalytics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.analytics = action.payload.data;
            })
            .addCase(getGlobalAnalytics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = analyticsSlice.actions;

export default analyticsSlice.reducer;
