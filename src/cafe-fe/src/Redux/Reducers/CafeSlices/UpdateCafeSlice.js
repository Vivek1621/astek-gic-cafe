import { createSlice } from "@reduxjs/toolkit";

export const updateCafeSlice = createSlice({
  name: "updateCafe",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchUpdateCafesRequest: (state) => {
      state.isLoading = true;
    },
    fetchUpdateCafesSuccess: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    fetchUpdateCafesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUpdateCafesRequest,
  fetchUpdateCafesSuccess,
  fetchUpdateCafesFailure,
} = updateCafeSlice.actions;

export default updateCafeSlice.reducer;