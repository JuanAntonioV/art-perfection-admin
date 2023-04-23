import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../../api/auth/authApi';

export const login = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const response = await loginApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload, thunkAPI) => {
        try {
            const response = await logoutApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);
