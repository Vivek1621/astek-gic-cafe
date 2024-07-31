import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchDeleteCafesSuccess,
  fetchDeleteCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/DeleteCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { fetchGetCafesRequest } from "../../../Redux/Reducers/CafeSlices/GetCafeListSlice";

function* fetchDeleteCafes(action) {
  try {
    const response = yield call(axios.delete, ENDPOINTS.DELETE_CAFE_URL, { data: action.payload });
    yield put(fetchDeleteCafesSuccess(response.data));
    yield call(fetchGetCafesRequest());
  } catch (error) {
    yield put(fetchDeleteCafesFailure(error.message));
  }
}

function* deleteCafeSaga() {
  yield takeLatest("deleteCafe/fetchDeleteCafesRequest", fetchDeleteCafes);
}

export default deleteCafeSaga;