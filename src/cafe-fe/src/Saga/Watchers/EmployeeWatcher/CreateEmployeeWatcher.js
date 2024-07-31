import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchCreateEmployeesSuccess,
    fetchCreateEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/CreateEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchCreateEmployee(action) {
    try {
        const response = yield call(axios.post, ENDPOINTS.CREATE_EMPLOYEE_URL, action.payload);
        yield put(fetchCreateEmployeesSuccess(response.data));
        const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: true,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))

    } catch (error) {
        yield put(fetchCreateEmployeesFailure(error.message));
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

function* createEmployeeSaga() {
    yield takeLatest("createEmployee/fetchCreateEmployeesRequest", fetchCreateEmployee);
}

export default createEmployeeSaga;