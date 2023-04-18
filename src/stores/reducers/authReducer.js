import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: 'John Doe',
        email: 'jhondoe@email.com',
        role: 'admin',
        status: 'active',
    },
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
