import {
    createHolidayApi,
    deleteHolidayApi,
    getAllHolidayApi,
} from '@/api/holidayApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllHolidayThunk = createAsyncThunk(
    'holiday/getAllHolidayThunk',
    async (token, thunkAPI) => {
        try {
            const response = await getAllHolidayApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const createHolidayThunk = createAsyncThunk(
    'holiday/createHolidayThunk',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await createHolidayApi(token, payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const deleteHolidayThunk = createAsyncThunk(
    'holiday/deleteHolidayThunk',
    async (payload, thunkAPI) => {
        try {
            const { token, id } = payload;
            const response = await deleteHolidayApi(token, id);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
