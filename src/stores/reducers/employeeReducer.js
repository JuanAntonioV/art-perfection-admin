import { createSlice } from '@reduxjs/toolkit';
import {
    getEmployee,
    getEmployeeDetail,
    nonActiveEmployee,
    updateEmployee,
} from '../thunks/employeeThunk';

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

        // getEmployeeDetail
        builder
            .addCase(getEmployeeDetail.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getEmployeeDetail.fulfilled, (state, action) => {
                state.status = 'success';
                state.employee = action.payload.data;
            })
            .addCase(getEmployeeDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // updateEmployee
        builder
            .addCase(updateEmployee.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
