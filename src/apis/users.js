import api from "./axios";

export const userService = {
    getAllUsers: (params) =>
        api.get('/users', { params }),
    getUserById: (id) =>
        api.get(`/users/${id}`),
    updateUser: (id, data) =>
        api.put(`/users/${id}`, data),
    deleteUser: (id) =>
        api.delete(`/users/${id}`),
};