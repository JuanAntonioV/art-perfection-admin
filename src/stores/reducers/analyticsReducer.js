import { createSlice } from '@reduxjs/toolkit';
import { getGlobalAnalytics, getUserAnalytics } from '../thunks/analyticsThunk';

const initialState = {
    analytics: [],
    userAnalytics: [],
    status: 'idle', // idle | loading | success | failed
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
                state.status = 'success';
                state.analytics = action.payload.data;
            })
            .addCase(getGlobalAnalytics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Get user analytics
        builder
            .addCase(getUserAnalytics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserAnalytics.fulfilled, (state, action) => {
                state.status = 'success';
                state.userAnalytics = action.payload.data;
            })
            .addCase(getUserAnalytics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = analyticsSlice.actions;

export default analyticsSlice.reducer;
