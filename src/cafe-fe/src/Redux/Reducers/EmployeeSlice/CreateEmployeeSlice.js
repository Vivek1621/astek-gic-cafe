import { createSlice } from "@reduxjs/toolkit";

export const createEmployeeSlice = createSlice({
  name: "createEmployee",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCreateEmployeesRequest: (state) => {
      state.isLoading = true;
    },
    fetchCreateEmployeesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchCreateEmployeesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCreateEmployeesRequest,
  fetchCreateEmployeesSuccess,
  fetchCreateEmployeesFailure,
} = createEmployeeSlice.actions;

export default createEmployeeSlice.reducer;