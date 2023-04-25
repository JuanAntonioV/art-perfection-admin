import api from './client';

export const getEmployeeApi = (token) => {
    const response = api.get('employee', {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const nonActiveEmployeeApi = (payload, token) => {
    const response = api.post(`user/non-active`, payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const getEmployeeDetailApi = (id, token) => {
    const response = api.get(`employee/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const updateEmployeeApi = (id, payload, token) => {
    const response = api.put(`employee/${id}`, payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
