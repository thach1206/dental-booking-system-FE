import api from "./axios";

export const doctorService = {
    getAllDoctors: () =>
        api.get('/doctors'),
    getDoctorById: (id) =>
        api.get(`/doctors/${id}`),
    createDoctor: (data) =>
        api.post('/doctors', data),
    updateDoctor: (id, data) =>
        api.put(`/doctors/${id}`, data),
    deleteDoctor: (id) =>
        api.delete(`/doctors/${id}`),
};