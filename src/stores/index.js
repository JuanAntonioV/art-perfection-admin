import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authReducer';
import employeeReducer from './reducers/employeeReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employes: employeeReducer,
    },
});
