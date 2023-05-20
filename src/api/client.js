import axios from 'axios';

const BASE_URL = 'https://api.theapgroup.id/v1/';

const api = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
