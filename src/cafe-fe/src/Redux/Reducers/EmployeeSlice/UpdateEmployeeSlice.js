import { createSlice } from "@reduxjs/toolkit";

export const updateEmployeeSlice = createSlice({
  name: "updateEmployee",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchUpdateEmployeesRequest: (state) => {
      state.isLoading = true;
    },
    fetchUpdateEmployeesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchUpdateEmployeesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUpdateEmployeesRequest,
  fetchUpdateEmployeesSuccess,
  fetchUpdateEmployeesFailure,
} = updateEmployeeSlice.actions;

export default updateEmployeeSlice.reducer;