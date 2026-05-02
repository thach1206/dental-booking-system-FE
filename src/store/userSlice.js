import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 🟢 SET ALL
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // 🟢 ADD
        addUser: (state, action) => {
            state.users.push(action.payload);
        },

        // 🟢 UPDATE
        updateUser: (state, action) => {
            const index = state.users.findIndex(
                (u) => u.id === action.payload.id
            );

            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },

        // 🔴 DELETE
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (u) => u.id !== action.payload
            );
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;