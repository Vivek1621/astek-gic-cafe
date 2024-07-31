import { createSlice } from "@reduxjs/toolkit";

export const getCafeDropdownSlice = createSlice({
  name: "cafeDropdown",
  initialState: {
    cafeList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCafesDropdownRequest: (state) => {
      state.isLoading = true;
    },
    fetchCafesDropdownSuccess: (state, action) => {
      state.isLoading = false;
      state.cafeList = action.payload;
    },
    fetchCafesDropdownFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCafesDropdownRequest,
  fetchCafesDropdownSuccess,
  fetchCafesDropdownFailure,
} = getCafeDropdownSlice.actions;

export default getCafeDropdownSlice.reducer;