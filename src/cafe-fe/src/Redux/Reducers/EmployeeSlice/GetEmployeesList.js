import { createSlice } from "@reduxjs/toolkit";

const getEmployeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesListRequest: (state) => {
      state.loading = true;
    },
    fetchEmployeesListSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEmployeesListRequest,
  fetchEmployeesListSuccess,
  fetchEmployeesListFailure,
} = getEmployeeSlice.actions;

export default getEmployeeSlice.reducer;