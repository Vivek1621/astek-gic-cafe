import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUpdateCafesSuccess,
  fetchUpdateCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/UpdateCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchUpdateCafes(action) {
  try {
    const response = yield call(axios.put, ENDPOINTS.UPDATE_CAFE_URL, action.payload);
    yield put(fetchUpdateCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchUpdateCafesFailure(error.message));
  }
}

function* updateCafeSaga() {
  yield takeLatest("updateCafe/fetchUpdateCafesRequest", fetchUpdateCafes);
}

export default updateCafeSaga;