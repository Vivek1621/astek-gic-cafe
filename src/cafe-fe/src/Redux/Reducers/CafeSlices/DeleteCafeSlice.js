import { createSlice } from "@reduxjs/toolkit";

export const deleteCafeSlice = createSlice({
  name: "deleteCafe",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDeleteCafesRequest: (state) => {
      state.isLoading = true;
    },
    fetchDeleteCafesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchDeleteCafesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDeleteCafesRequest,
  fetchDeleteCafesSuccess,
  fetchDeleteCafesFailure,
} = deleteCafeSlice.actions;

export default deleteCafeSlice.reducer;