import {
    forgotPassword,
    getUser,
    login,
    logout,
    register,
    resetPassword,
} from '@/stores/thunks/authThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: 'John Doe',
        email: 'jhondoe@email.com',
        role: 'admin',
        status: 'active',
    },
    token: localStorage.getItem('token') || null,
    forgotPassword: {
        email: '',
        token: '',
        expires: '',
    },
    isAuthenticated: localStorage.getItem('token') ? true : false,
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
                state.error = null;
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

                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });

        // Register
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });

        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.status = 'success';

                state.forgotPassword.email = action.payload.data.data.email;
                state.forgotPassword.token = action.payload.data.data.token;
                state.forgotPassword.expires = Date.now() + 59 * 1000;

                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });

        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.data;
            });

        // Me
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'success';

                localStorage.setItem('token', action.payload.data.data.token);

                state.user = action.payload.data.data.user;
                state.token = action.payload.data.data.token;
                state.isAuthenticated = true;
                state.error = null;
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
