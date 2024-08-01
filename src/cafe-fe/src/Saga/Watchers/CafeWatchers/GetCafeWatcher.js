import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchGetCafesSuccess,
  fetchGetCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/GetCafeListSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchCafes(action) {
  console.log(action)
  try {
    // const { payload: cafeId } = action;
    // let url = ENDPOINTS.GET_EMPLOYEE_URL;

    // if (cafeId) {
    //     url += `?cafe=${cafeId}`;
    // }
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