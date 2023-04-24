import api from './client';

export const getHeadsApi = async (token) => {
    const response = await api.get('/heads', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
