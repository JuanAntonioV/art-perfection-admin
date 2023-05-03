import {
    checkHeadCanVoteApi,
    createVoteApi,
    getAllUserVotedTodayApi,
} from '@/api/voteApi';
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

export const checkHeadCanVote = createAsyncThunk(
    'votes/checkHeadCanVote',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await checkHeadCanVoteApi(token, payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getAllUserVotedToday = createAsyncThunk(
    'votes/getAllUserVotedToday',
    async (payload, thunkAPI) => {
        try {
            const response = await getAllUserVotedTodayApi(payload);
            console.log(response.data);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
