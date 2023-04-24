import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    forgotPasswordApi,
    getUserApi,
    loginApi,
    logoutApi,
    registerApi,
    resetPasswordApi,
    updatePasswordApi,
    updateProfileApi,
} from '../../api/auth/authApi';

export const login = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const response = await loginApi(payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (token, thunkAPI) => {
        try {
            const response = await logoutApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const response = await registerApi(payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (payload, thunkAPI) => {
        try {
            const response = await forgotPasswordApi(payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, thunkAPI) => {
        try {
            const response = await resetPasswordApi(payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (token, thunkAPI) => {
        try {
            const response = await getUserApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await updateProfileApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await updatePasswordApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
