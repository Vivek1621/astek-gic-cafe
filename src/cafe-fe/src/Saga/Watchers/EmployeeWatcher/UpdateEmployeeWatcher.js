import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUpdateEmployeesSuccess,
    fetchUpdateEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/UpdateEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchUpdateEmployee(action) {
    try {
        const response = yield call(axios.put, ENDPOINTS.UPDATE_EMPLOYEE_URL, action.payload);
        yield put(fetchUpdateEmployeesSuccess(response.data));
        const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: true,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
    } catch (error) {
        yield put(fetchUpdateEmployeesFailure(error.message));
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

function* updateEmployeeSaga() {
    yield takeLatest("updateEmployee/fetchUpdateEmployeesRequest", fetchUpdateEmployee);
}

export default updateEmployeeSaga;