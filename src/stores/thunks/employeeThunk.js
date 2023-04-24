import { getEmployeeApi } from '@/api/employeeApi';
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
