import { getStatsApi } from '@/api/statsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getStats = createAsyncThunk(
    'stats/getStats',
    async (payload, thunkAPI) => {
        try {
            const response = await getStatsApi(payload);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);
