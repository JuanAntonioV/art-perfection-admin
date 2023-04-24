import api from './client';

export const getEmployeeApi = (token) => {
    const response = api.get('employee', {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
