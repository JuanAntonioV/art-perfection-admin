import api from './client';

export const getTeamsApi = (token) => {
    const response = api.get('/teams/all', {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const getTeamDetailsApi = (token, teamId) => {
    const response = api.get(`/teams/${teamId}`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const deleteTeamApi = (token, teamId) => {
    const response = api.delete(`/teams/delete/${teamId}`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const unAssignUserFromTeamApi = (data, token) => {
    const response = api.post(`/teams/users/unassigned`, data, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const assignUserToTeamApi = (data, token) => {
    const response = api.post(`/teams/users/assigned`, data, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const createTeamApi = (data, token) => {
    const response = api.post('/teams/create', data, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const updateTeamDetailApi = (data, teamId, token) => {
    const response = api.put(`/teams/update/${teamId}`, data, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};
