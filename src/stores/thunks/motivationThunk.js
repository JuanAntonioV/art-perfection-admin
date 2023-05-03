import {
    createMotivationApi,
    getAllMotivationApi,
    getMotivationByIdApi,
} from '@/api/motivation-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllMotivation = createAsyncThunk(
    'motivation/getAllMotivation',
    async (payload, thunkAPI) => {
        try {
            const response = await getAllMotivationApi(payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const createMotivation = createAsyncThunk(
    'motivation/createMotivation',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await createMotivationApi(token, payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getMotivationById = createAsyncThunk(
    'motivation/getMotivationById',
    async (payload, thunkAPI) => {
        try {
            const { token, id } = payload;
            const response = await getMotivationByIdApi(token, id);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
