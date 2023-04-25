import {
    downGradeHeadApi,
    getHeadDetailApi,
    getHeadsApi,
    nonActiveHeadApi,
    updateHeadApi,
} from '@/api/headsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getHeads = createAsyncThunk(
    'heads/getHeads',
    async (token, thunkAPI) => {
        try {
            const response = await getHeadsApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const downGradeHead = createAsyncThunk(
    'heads/downGradeHead',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await downGradeHeadApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const nonActiveHead = createAsyncThunk(
    'heads/nonActiveHead',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await nonActiveHeadApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getHeadDetail = createAsyncThunk(
    'heads/getHeadDetail',
    async (payload, thunkAPI) => {
        try {
            const { id, token } = payload;
            const response = await getHeadDetailApi(id, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const updateHead = createAsyncThunk(
    'heads/updateHead',
    async (payload, thunkAPI) => {
        try {
            const { id, token } = payload;
            delete payload.id;
            delete payload.token;
            const response = await updateHeadApi(payload, id, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
