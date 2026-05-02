import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reminderReducer from './reminderSlice';
import serviceReducer from './serviceSlice';
import appointmentReducer from './appointmentSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    reminder: reminderReducer,
    service: serviceReducer,
    appointment: appointmentReducer,
    user: userReducer,

  },
});

export default store;