import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.isLoading = true;
    },
    fetchDataSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchDataError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataError } = dataSlice.actions;

export default dataSlice.reducer;
