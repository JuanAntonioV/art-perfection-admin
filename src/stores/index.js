import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authReducer';
import employeeReducer from './reducers/employeeReducer';
import headReducer from './reducers/headReducer';
import teamReducer from './reducers/teamReducer';
import statsReducer from './reducers/statsReducer';
import analyticsReducer from './reducers/analyticsReducer';
import holidayReducer from './reducers/holidayReducer';
import voteReducer from './reducers/voteReducer';
import motivationReducer from './reducers/motivationReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employes: employeeReducer,
        head: headReducer,
        team: teamReducer,
        stat: statsReducer,
        analytics: analyticsReducer,
        holiday: holidayReducer,
        vote: voteReducer,
        motivation: motivationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
