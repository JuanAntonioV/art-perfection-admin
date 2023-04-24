import { createSlice } from '@reduxjs/toolkit';
import { getTeams } from '../thunks/teamsThunk';

const initialState = {
    teams: [],
    team: {},
    status: 'idle', //idle | loading | success | failed
    error: null,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // getTeams
        builder
            .addCase(getTeams.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getTeams.fulfilled, (state, action) => {
                state.status = 'success';
                state.teams = action.payload.data;
            })
            .addCase(getTeams.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
