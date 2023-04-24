import {
    getEmployeeApi,
    getEmployeeDetailApi,
    nonActiveEmployeeApi,
} from '@/api/employeeApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEmployee = createAsyncThunk(
    'employee/getEmployee',
    async (token, thunkAPI) => {
        try {
            const response = await getEmployeeApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const nonActiveEmployee = createAsyncThunk(
    'employee/nonActiveEmployee',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await nonActiveEmployeeApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getEmployeeDetail = createAsyncThunk(
    'employee/getEmployeeDetail',
    async (payload, thunkAPI) => {
        try {
            const { token, id } = payload;
            delete payload.token;
            const response = await getEmployeeDetailApi(id, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
