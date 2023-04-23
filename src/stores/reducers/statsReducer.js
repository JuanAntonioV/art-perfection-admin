import { createSlice } from '@reduxjs/toolkit';
import { getStats } from '../thunks/statsThunk';

const initialState = {
    stats: {},
    status: 'idle', // idle | loading | success | failed
    error: null,
};

const statsSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // getStats
        builder
            .addCase(getStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStats.fulfilled, (state, action) => {
                state.status = 'success';
                state.stats = action.payload.data.data;
            })
            .addCase(getStats.rejected, (state, action) => {
                state.status = 'failed';

                if (action.payload?.status === 401) {
                    localStorage.removeItem('token');
                    state.isAuthenticated = false;
                }

                state.error = action.payload?.data;
            });
    },
});

export default statsSlice.reducer;
