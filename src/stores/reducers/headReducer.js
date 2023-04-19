import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heads: [
        {
            id: 1,
            name: 'John Doe',
            email: 'jhondoe@email.com',
            status: 'active',
            registeredAt: '12 May 2023',
        },
        {
            id: 2,
            name: 'Fulano de Tal',
            email: 'fill@email.com',
            status: 'nonactive',
            registeredAt: '14 May 2023',
        },
        {
            id: 3,
            name: 'Ciclano de Tal',
            email: 'cnasd@email.com',
            status: 'active',
            registeredAt: '15 May 2023',
        },
        {
            id: 4,
            name: 'John Doe',
            email: 'jhondoe@email.com',
            status: 'nonactive',
            registeredAt: '12 May 2023',
        },
    ],
    head: {},
    loading: false,
    error: null,
};

const headSlice = createSlice({
    name: 'head',
    initialState,
    reducers: {},
});

export const {} = headSlice.actions;

export default headSlice.reducer;
