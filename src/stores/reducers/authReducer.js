import { login, logout } from '@/stores/thunks/authThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: 'John Doe',
        email: 'jhondoe@email.com',
        role: 'admin',
        status: 'active',
    },
    token: null,
    isAuthenticated: false,
    status: 'idle', // idle || loading || success || failed
    error: null,
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Login
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';

                localStorage.setItem('token', action.payload.data.data.token);

                state.isAuthenticated = true;
                state.token = action.payload.data.data.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });

        // Logout
        builder
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'success';

                localStorage.removeItem('token');

                state.isAuthenticated = false;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
