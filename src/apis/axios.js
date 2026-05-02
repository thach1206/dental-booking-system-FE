import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend NestJS
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('TOKEN:', accessToken); 
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
   console.log('HEADERS:', config.headers);
  return config;
});

export default api;