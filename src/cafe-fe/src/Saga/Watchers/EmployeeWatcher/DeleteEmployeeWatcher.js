import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchDeleteEmployeesSuccess,
    fetchDeleteEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/DeleteEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";
import { fetchEmployeesListRequest } from "../../../Redux/Reducers/EmployeeSlice/GetEmployeesList";
import { setSnackbarData } from "../../../Redux/Reducers/SnackbarSlice";

function* fetchDeleteEmployee(action) {
    try {
        const response = yield call(axios.delete, ENDPOINTS.DELETE_EMPLOYEE_URL, { data: action.payload });
        yield put(fetchDeleteEmployeesSuccess(response.data));
        yield put(fetchEmployeesListRequest());
        const { message } = response.data;
        const snackbarData = {
            isOpen: true,
            message, type: "success",
            shouldExit: false,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
    } catch (error) {
        yield put(fetchDeleteEmployeesFailure(error.message));
        const snackbarData = {
            isOpen: true,
            message: error.message,
            type: "success",
            shouldExit: false,
            showIcon: false,
        }
        yield put(setSnackbarData(snackbarData))
    }
}

function* deleteEmployeeSaga() {
    yield takeLatest("deleteEmployee/fetchDeleteEmployeesRequest", fetchDeleteEmployee);
}

export default deleteEmployeeSaga;