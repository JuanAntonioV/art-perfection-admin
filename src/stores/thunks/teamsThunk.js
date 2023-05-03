import {
    assignUserToTeamApi,
    createTeamApi,
    deleteTeamApi,
    getTeamDetailsApi,
    getTeamsApi,
    unAssignUserFromTeamApi,
    updateTeamDetailApi,
} from '@/api/teamsApi';
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

export const getTeamDetails = createAsyncThunk(
    'teams/getTeamDetails',
    async (payload, thunkAPI) => {
        try {
            const { token, teamId } = payload;
            const response = await getTeamDetailsApi(token, teamId);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const deleteTeam = createAsyncThunk(
    'teams/deleteTeam',
    async (payload, thunkAPI) => {
        try {
            const { token, teamId } = payload;
            const response = await deleteTeamApi(token, teamId);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const unAssignUserFromTeam = createAsyncThunk(
    'teams/unAssignUserFromTeam',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await unAssignUserFromTeamApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const assignUserToTeam = createAsyncThunk(
    'teams/assignUserToTeam',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await assignUserToTeamApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const createTeam = createAsyncThunk(
    'teams/createTeam',
    async (payload, thunkAPI) => {
        try {
            const { token } = payload;
            delete payload.token;
            const response = await createTeamApi(payload, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const updateTeamDetail = createAsyncThunk(
    'teams/updateTeamDetail',
    async (payload, thunkAPI) => {
        try {
            const { token, teamId } = payload;
            delete payload.token;
            delete payload.teamId;
            const response = await updateTeamDetailApi(payload, teamId, token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);
