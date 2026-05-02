import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: [],
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        // set list
        setAppointments(state, action) {
            state.appointments = action.payload;
        },

        // add
        add(state, action) {
            state.appointments.push(action.payload);
        },

        // update
        update(state, action) {
            const index = state.appointments.findIndex(
                (a) => a.id === action.payload.id
            );

            if (index !== -1) {
                state.appointments[index] = {
                    ...state.appointments[index],
                    ...action.payload,
                };
            }
        },

        // delete
        remove(state, action) {
            state.appointments = state.appointments.filter(
                (a) => a.id !== action.payload
            );
        },
    },
});

export const appointmentActions = appointmentSlice.actions;
export default appointmentSlice.reducer;