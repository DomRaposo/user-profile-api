import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // URL base do backend Laravel
    withCredentials: true                  // Para enviar cookies (Sanctum)
});

export default api;
