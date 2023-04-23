import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/v1/';

const api = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
