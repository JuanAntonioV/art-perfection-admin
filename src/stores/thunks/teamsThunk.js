import { getTeamsApi } from '@/api/teamsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTeams = createAsyncThunk(
    'teams/getTeams',
    async (token, thunkAPI) => {
        try {
            const response = await getTeamsApi(token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
