import api from "./axios";

export const reminderService = {
    getAllReminders: () =>
        api.get('admin/reminders'),
    getReminderById: (id) =>
        api.get(`admin/reminders/${id}`),
    createReminder: (data) =>
        api.post('admin/reminders', data),
    updateReminder: (id, data) =>
        api.put(`admin/reminders/${id}`, data),
    deleteReminder: (id) =>
        api.delete(`admin/reminders/${id}`),
};