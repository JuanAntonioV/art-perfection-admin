import api from '../client';

export const loginApi = (payload) => {
    const response = api.post('auth/login', payload);
    return response;
};

export const logoutApi = (token) => {
    const response = api.post('auth/logout', null, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const registerApi = (payload) => {
    const response = api.post('auth/register', payload);
    return response;
};

export const forgotPasswordApi = (payload) => {
    const response = api.post('auth/forgot-password', payload);
    return response;
};

export const resetPasswordApi = (payload) => {
    const response = api.post('auth/reset-password', payload);
    return response;
};

export const getUserApi = (token) => {
    const response = api.get('auth/me', {
        headers: {
            Authorization: token,
        },
    });
    return response;
};

export const updateProfileApi = (payload, token) => {
    const response = api.post('profile/update', payload, {
        headers: {
            Authorization: token,
        },
    });
    return response;
};
