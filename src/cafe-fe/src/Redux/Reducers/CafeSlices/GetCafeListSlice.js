import { createSlice } from "@reduxjs/toolkit";

export const getCafeSlice = createSlice({
  name: "getCafe",
  initialState: {
    cafes: [],
    cafeDetails: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchGetCafesRequest: (state) => {
      state.isLoading = true;
    },
    fetchGetCafesSuccess: (state, action) => {
      state.isLoading = false;
      state.cafes = action.payload;
    },
    fetchGetCafesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGetCafesRequest,
  fetchGetCafesSuccess,
  fetchGetCafesFailure,
} = getCafeSlice.actions;

export default getCafeSlice.reducer;