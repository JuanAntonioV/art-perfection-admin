import api from './client';

export const getStatsApi = async (payload) => {
    const response = await api.get('stats', {
        headers: {
            Authorization: payload,
        },
    });
    return response;
};
