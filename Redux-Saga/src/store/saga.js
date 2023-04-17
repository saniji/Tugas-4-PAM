import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchDataSuccess, fetchDataFailure, fetchDataRequest } from './actions/actions';

function* fetchData() {
  try {
    const response = yield axios.get('https://raw.githubusercontent.com/saniji/API/main/data.json');
    const data = response.data;
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* fetchDataSaga() {
  yield takeLatest(fetchDataRequest.type, fetchData);
}