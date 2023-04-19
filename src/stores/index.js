import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authReducer';
import employeeReducer from './reducers/employeeReducer';
import headReducer from './reducers/headReducer';
import teamReducer from './reducers/teamReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employes: employeeReducer,
        head: headReducer,
        team: teamReducer,
    },
});
