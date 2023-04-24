import api from './client';

export const getGlobalAnalyticsApi = (token) => {
    const response = api.get('analytics/global', {
        headers: {
            Authorization: token,
        },
    });

    return response;
};
