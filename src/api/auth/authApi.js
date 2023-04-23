import api from '../client';

export const loginApi = async (payload) => {
    const response = await api.post('auth/login', payload);
    return response;
};

export const logoutApi = async (payload) => {
    const response = await api.post('auth/logout', payload, {
        headers: {
            Authorization: payload,
        },
    });
    return response;
};

export const registerApi = async (payload) => {
    const response = await api.post('auth/register', payload);
    return response;
};

export const forgotPasswordApi = async (payload) => {
    const response = await api.post('auth/forgot-password', payload);
    return response;
};

export const resetPasswordApi = async (payload) => {
    const response = await api.post('auth/reset-password', payload);
    return response;
};
