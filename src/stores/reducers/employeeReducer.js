import { createSlice } from '@reduxjs/toolkit';
import { getEmployee, nonActiveEmployee } from '../thunks/employeeThunk';

const initialState = {
    employes: [],
    employee: {},
    status: 'idle', //idle, loading, success, failed
    error: null,
};

const employeeSlice = createSlice({
    name: 'employes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // getEmployee
        builder
            .addCase(getEmployee.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.status = 'success';
                state.employes = action.payload.data;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // nonActiveEmployee
        builder
            .addCase(nonActiveEmployee.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(nonActiveEmployee.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(nonActiveEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
