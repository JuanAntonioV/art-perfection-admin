import api from './client';

export const getAllHolidayApi = async (token) => {
    const response = await api.get('/holiday/all', {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const createHolidayApi = async (token, data) => {
    const response = await api.post('/holiday/create', data, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const deleteHolidayApi = async (token, id) => {
    const response = await api.delete(`/holiday/delete/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
