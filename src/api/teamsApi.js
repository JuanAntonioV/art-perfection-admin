import api from './client';

export const getTeamsApi = (token) => {
    const response = api.get('/teams/all', {
        headers: {
            Authorization: token,
        },
    });

    return response;
};
