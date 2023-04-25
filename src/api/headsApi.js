import api from './client';

export const getHeadsApi = async (token) => {
    const response = await api.get('/heads', {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const downGradeHeadApi = async (payload, token) => {
    const response = await api.post('heads/downgrade', payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const nonActiveHeadApi = async (payload, token) => {
    const response = await api.post('user/non-active', payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const getHeadDetailApi = async (id, token) => {
    const response = await api.get(`/heads/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const updateHeadApi = async (payload, id, token) => {
    const response = await api.put(`/head/${id}`, payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
