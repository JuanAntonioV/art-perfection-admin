import api from './client';

export const getAllMotivationApi = async (token) => {
    const response = await api.get('/motivations', {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const createMotivationApi = async (token, data) => {
    const response = await api.post('/motivations', data, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const getMotivationByIdApi = async (token, id) => {
    const response = await api.get(`/motivations/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};
