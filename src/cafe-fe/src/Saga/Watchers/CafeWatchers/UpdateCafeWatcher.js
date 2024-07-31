import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUpdateCafesSuccess,
  fetchUpdateCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/UpdateCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchUpdateCafes(action) {
  try {
    const response = yield call(axios.put, ENDPOINTS.UPDATE_CAFE_URL, action.payload);
    yield put(fetchUpdateCafesSuccess(response.data));
    const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: true,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
  } catch (error) {
    yield put(fetchUpdateCafesFailure(error.message));
    const snackbarData = {
            isOpen: true,
            message: error.message, 
            type: "error",
            shouldExit: false,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
  }
}

function* updateCafeSaga() {
  yield takeLatest("updateCafe/fetchUpdateCafesRequest", fetchUpdateCafes);
}

export default updateCafeSaga;