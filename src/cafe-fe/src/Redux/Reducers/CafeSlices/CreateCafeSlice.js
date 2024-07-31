import { createSlice } from "@reduxjs/toolkit";

export const createCafeSlice = createSlice({
  name: "createCafe",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCreateCafesRequest: (state) => {
      state.isLoading = true;
    },
    fetchCreateCafesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchCreateCafesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCreateCafesRequest,
  fetchCreateCafesSuccess,
  fetchCreateCafesFailure,
} = createCafeSlice.actions;

export default createCafeSlice.reducer;