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
    const response = api.post(`employee/non-active`, payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
