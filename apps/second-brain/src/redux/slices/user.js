import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        isAuthenticated: false,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.profile = action.payload.profile;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.profile = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
