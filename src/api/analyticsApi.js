import api from './client';

export const getGlobalAnalyticsApi = (token) => {
    const response = api.get('analytics/global', {
        headers: {
            Authorization: token,
        },
    });

    return response;
};

export const getUserAnalyticsApi = (id, token) => {
    const response = api.get(`analytics/user/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
};
