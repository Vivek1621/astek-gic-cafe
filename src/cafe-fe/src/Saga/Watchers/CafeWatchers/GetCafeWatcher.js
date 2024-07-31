import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchGetCafesSuccess,
  fetchGetCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/GetCafeListSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchCafes(action) {
  try {
    const response = yield call(axios.get, ENDPOINTS.GET_CAFE_URL, {
      params: { location: action.payload },
    });
    yield put(fetchGetCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchGetCafesFailure(error.message));
  }
}

function* getCafeSaga() {
  yield takeLatest("getCafe/fetchGetCafesRequest", fetchCafes);
}

export default getCafeSaga;