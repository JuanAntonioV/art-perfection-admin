import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
