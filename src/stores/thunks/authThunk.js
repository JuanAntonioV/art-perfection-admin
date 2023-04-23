import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    forgotPasswordApi,
    getUserApi,
    loginApi,
    logoutApi,
    registerApi,
    resetPasswordApi,
} from '../../api/auth/authApi';

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
    async (token, thunkAPI) => {
        try {
            const response = await logoutApi(token);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const response = await registerApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (payload, thunkAPI) => {
        try {
            const response = await forgotPasswordApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, thunkAPI) => {
        try {
            const response = await resetPasswordApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (token, thunkAPI) => {
        try {
            const response = await getUserApi(token);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);
