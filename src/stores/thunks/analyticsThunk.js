import { getGlobalAnalyticsApi, getUserAnalyticsApi } from '@/api/analyticsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getGlobalAnalytics = createAsyncThunk(
    'analytics/getGlobalAnalytics',
    async (token, thunkAPI) => {
        try {
            const response = await getGlobalAnalyticsApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getUserAnalytics = createAsyncThunk(
    'analytics/getUserAnalytics',
    async (payload, thunkAPI) => {
        try {
            const { id, token } = payload;
            const response = await getUserAnalyticsApi(id, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
