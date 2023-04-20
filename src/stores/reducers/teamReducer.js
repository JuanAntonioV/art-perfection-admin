import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: [
        {
            id: 1,
            head: 'John Doe',
            name: 'Team 1',
            employeeTotal: 5,
            createdAt: '12 May 2023',
        },
        {
            id: 2,
            head: 'Fulano de Tal',
            name: 'Team 2',
            employeeTotal: 3,
            createdAt: '14 May 2023',
        },
        {
            id: 3,
            head: 'Ciclano de Tal',
            name: 'Team 3',
            employeeTotal: 2,
            createdAt: '15 May 2023',
        },
    ],
    team: {},
    loading: false,
    error: null,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        createTeam: (state, action) => {
            state.teams.push(action.payload);
        },
    },
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
