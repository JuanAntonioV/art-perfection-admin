import { createVoteApi } from '@/api/voteApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createVote = createAsyncThunk(
    'votes/createVote',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await createVoteApi(token, payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
