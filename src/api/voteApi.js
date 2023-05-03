import api from './client';

export const createVoteApi = async (token, data) => {
    const response = await api.post('/vote', data, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const checkHeadCanVoteApi = async (token, data) => {
    const response = await api.post('/vote/check', data, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const getAllUserVotedTodayApi = async (token) => {
    const response = await api.get(`/vote/users`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
