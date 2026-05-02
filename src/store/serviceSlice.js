import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        // set toàn bộ list
        setServices(state, action) {
            state.services = action.payload;
        },

        // thêm service
        addService(state, action) {
            state.services.push(action.payload);
        },

        // update service
        updateService(state, action) {
            const index = state.services.findIndex(
                (s) => s.id === action.payload.id
            );
            if (index !== -1) {
                state.services[index] = action.payload;
            }
        },

        // delete service
        deleteService(state, action) {
            state.services = state.services.filter(
                (s) => s.id !== action.payload
            );
        },
    },
});

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;