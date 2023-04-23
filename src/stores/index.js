import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authReducer';
import employeeReducer from './reducers/employeeReducer';
import headReducer from './reducers/headReducer';
import teamReducer from './reducers/teamReducer';
import statsReducer from './reducers/statsReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employes: employeeReducer,
        head: headReducer,
        team: teamReducer,
        stat: statsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
