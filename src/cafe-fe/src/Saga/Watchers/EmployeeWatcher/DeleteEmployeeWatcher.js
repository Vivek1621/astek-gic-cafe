import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchDeleteEmployeesSuccess,
    fetchDeleteEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/DeleteEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchDeleteEmployee(action) {
    try {
        const response = yield call(axios.delete, ENDPOINTS.DELETE_EMPLOYEE_URL, { data: action.payload });
        yield put(fetchDeleteEmployeesSuccess(response.data));
    } catch (error) {
        yield put(fetchDeleteEmployeesFailure(error.message));
    }
}

function* deleteEmployeeSaga() {
    yield takeLatest("deleteEmployee/fetchDeleteEmployeesRequest", fetchDeleteEmployee);
}

export default deleteEmployeeSaga;