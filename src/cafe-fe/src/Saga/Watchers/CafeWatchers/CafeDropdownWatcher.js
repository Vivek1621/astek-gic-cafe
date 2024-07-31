import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchCafesDropdownSuccess,
    fetchCafesDropdownFailure,
} from "../../../Redux/Reducers/CafeSlices/GetCafeDropdownSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchCafesDropdown (action) {
  try {
    const response = yield call(axios.get, ENDPOINTS.GET_CAFE_URL, {
      params: { location: action.payload },
    });
    yield put(fetchCafesDropdownSuccess(response.data));
  } catch (error) {
    yield put(fetchCafesDropdownFailure(error.message));
  }
}

function* getCafeDropdownSaga() {
  yield takeLatest("cafeDropdown/fetchCafesDropdownRequest", fetchCafesDropdown);
}

export default getCafeDropdownSaga;
