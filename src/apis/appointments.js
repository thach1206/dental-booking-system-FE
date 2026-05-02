import api from "./axios";

export const appointmentService = {
    getAllAppointments: () =>
        api.get('/appointments'),
    getAppointmentById: (id) =>
        api.get(`/appointments/${id}`),
    createAppointment: (data) =>
        api.post('/appointments', data),
    updateAppointment: (id, data) =>
        api.patch(`/appointments/${id}`, data),
    deleteAppointment: (id) =>
        api.delete(`/appointments/${id}`),
};