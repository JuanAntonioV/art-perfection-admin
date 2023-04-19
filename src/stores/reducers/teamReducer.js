import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teams: [
        {
            id: 1,
            head: 'John Doe',
            name: 'Team 1',
            status: 'active',
            createdAt: '12 May 2023',
        },
        {
            id: 2,
            head: 'Fulano de Tal',
            name: 'Team 2',
            status: 'nonactive',
            createdAt: '14 May 2023',
        },
        {
            id: 3,
            head: 'Ciclano de Tal',
            name: 'Team 3',
            status: 'active',
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
    reducers: {},
});

export const {} = teamSlice.actions;

export default teamSlice.reducer;
