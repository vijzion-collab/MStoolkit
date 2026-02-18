import { configureStore } from '@reduxjs/toolkit';
import todoistReducer from './slices/todoist';
import financeReducer from './slices/finance';
import userReducer from './slices/user';

export default configureStore({
    reducer: {
        todoist: todoistReducer,
        finance: financeReducer,
        user: userReducer,
    },
});
