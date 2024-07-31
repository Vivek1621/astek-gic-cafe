import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchDeleteCafesSuccess,
  fetchDeleteCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/DeleteCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { fetchGetCafesRequest } from "../../../Redux/Reducers/CafeSlices/GetCafeListSlice";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchDeleteCafes(action) {
  try {
    const response = yield call(axios.delete, ENDPOINTS.DELETE_CAFE_URL, { data: action.payload });
    yield put(fetchDeleteCafesSuccess(response.data));
    yield put(fetchGetCafesRequest());
    const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: true,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
  } catch (error) {
    yield put(fetchDeleteCafesFailure(error.message));
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

function* deleteCafeSaga() {
  yield takeLatest("deleteCafe/fetchDeleteCafesRequest", fetchDeleteCafes);
}

export default deleteCafeSaga;