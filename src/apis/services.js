import api from "./axios";

export const serviceService = {
    getAllServices: () =>
    api.get('/services'),
    getServiceById: (id) =>
        api.get(`/services/${id}`), 
    createService: (data) =>
        api.post('/services', data),
    updateService: (id, data) =>
        api.patch(`/services/${id}`, data),
    deleteService: (id) =>
        api.delete(`/services/${id}`),
};