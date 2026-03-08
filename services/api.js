import axios from 'axios';
import { config } from '../utils/config.js';
import { getToken } from '../utils/storage.js';

const api = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((requestConfig) => {
    const token = getToken();
    if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
}, (error) => {
    return Promise.reject(error);
});

export default api;
