import { createSlice } from "@reduxjs/toolkit";

export const deleteEmployeeSlice = createSlice({
  name: "deleteEmployee",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDeleteEmployeesRequest: (state) => {
      state.isLoading = true;
    },
    fetchDeleteEmployeesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchDeleteEmployeesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDeleteEmployeesRequest,
  fetchDeleteEmployeesSuccess,
  fetchDeleteEmployeesFailure,
} = deleteEmployeeSlice.actions;

export default deleteEmployeeSlice.reducer;