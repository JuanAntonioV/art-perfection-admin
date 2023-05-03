import { createSlice } from '@reduxjs/toolkit';
import {
    assignUserToTeam,
    createTeam,
    deleteTeam,
    getTeamDetails,
    getTeams,
    unAssignUserFromTeam,
    updateTeamDetail,
} from '../thunks/teamsThunk';

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

        // getTeamDetails
        builder
            .addCase(getTeamDetails.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getTeamDetails.fulfilled, (state, action) => {
                state.status = 'success';
                state.team = action.payload.data;
            })
            .addCase(getTeamDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // deleteTeam
        builder
            .addCase(deleteTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // unAssignUserFromTeam
        builder
            .addCase(unAssignUserFromTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(unAssignUserFromTeam.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(unAssignUserFromTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // assignUserToTeam
        builder
            .addCase(assignUserToTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(assignUserToTeam.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(assignUserToTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // createTeam
        builder
            .addCase(createTeam.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // updateTeamDetail
        builder
            .addCase(updateTeamDetail.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateTeamDetail.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(updateTeamDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
