import { createSlice } from '@reduxjs/toolkit';

export const todoistSlice = createSlice({
    name: 'todoist',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setTasks, addTask, setLoading, setError } = todoistSlice.actions;

export default todoistSlice.reducer;
