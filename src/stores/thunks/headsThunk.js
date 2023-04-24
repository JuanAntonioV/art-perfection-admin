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
