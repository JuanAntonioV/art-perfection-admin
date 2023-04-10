import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: 'John Doe',
    },
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
