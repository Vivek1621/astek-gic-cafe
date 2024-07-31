import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchCreateCafesSuccess,
  fetchCreateCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/CreateCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchCreateCafes(action) {
  try {
    const response = yield call(axios.post, ENDPOINTS.CREATE_CAFE_URL, action.payload);
    yield put(fetchCreateCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchCreateCafesFailure(error.message));
  }
}

function* createCafeSaga() {
  yield takeLatest("createCafe/fetchCreateCafesRequest", fetchCreateCafes);
}

export default createCafeSaga;