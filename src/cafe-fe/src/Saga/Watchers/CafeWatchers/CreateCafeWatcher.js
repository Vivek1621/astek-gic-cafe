import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchCreateCafesSuccess,
  fetchCreateCafesFailure,
} from "../../../Redux/Reducers/CafeSlices/CreateCafeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchCreateCafes(action) {
  try {
    const response = yield call(axios.post, ENDPOINTS.CREATE_CAFE_URL, action.payload);
    yield put(fetchCreateCafesSuccess(response.data));
    const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: true,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
  } catch (error) {
    yield put(fetchCreateCafesFailure(error.message));
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

function* createCafeSaga() {
  yield takeLatest("createCafe/fetchCreateCafesRequest", fetchCreateCafes);
}

export default createCafeSaga;