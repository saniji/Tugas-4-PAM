import { createReducer } from '@reduxjs/toolkit';
import { fetchDataSuccess, fetchDataRequest, fetchDataFailure } from '../actions/actions';

const initialState = {
  data: [],
  error: '',
  isLoading: false,
};

const reducer = createReducer(initialState, {
  [fetchDataRequest.type]: (state) => {
    state.isLoading = true;
  },
  [fetchDataSuccess.type]: (state, action) => {
    state.isLoading = false;
    state.data = action.payload;
  },
  [fetchDataFailure.type]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});

export default reducer;