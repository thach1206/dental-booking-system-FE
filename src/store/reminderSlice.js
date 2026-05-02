import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reminders: [],
  loading: false,
  total: 0,
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    setReminders: (state, action) => {
      state.reminders = action.payload;
      state.total = action.payload.length;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addReminder: (state, action) => {
      state.reminders.push(action.payload);
      state.total += 1;
    },

    updateReminder: (state, action) => {
      const { id, data } = action.payload;

      const index = state.reminders.findIndex(r => r.id === id);

      if (index !== -1) {
        state.reminders[index] = {
          ...state.reminders[index],
          ...data,
        };
      }
    },

    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        r => r.id !== action.payload
      );
      state.total -= 1;
    },
  },
});

export const reminderActions = reminderSlice.actions;
export default reminderSlice.reducer;