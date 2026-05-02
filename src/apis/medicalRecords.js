import api from "./axios";

export const medicalRecords = {
    getAllMedicalRecords: () =>
        api.get('/medical-records'),
    getMedicalRecordById: (id) =>
        api.get(`/medical-records/${id}`),
    createMedicalRecord: (data) =>
        api.post('/medical-records', data),
    updateMedicalRecord: (id, data) =>
        api.put(`/medical-records/${id}`, data),
    deleteMedicalRecord: (id) =>
        api.delete(`/medical-records/${id}`),
};