import api from './axios';

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (data) =>
    api.post('/auth/register', data),

  refresh: (refreshToken) =>
    api.post('/auth/refresh', { refreshToken }),
  resetPassword: (data) =>
    api.post('/users/reset-password', data),
  forgotPassword: (email) =>
    api.post('/users/forgot-password', { email }),

};