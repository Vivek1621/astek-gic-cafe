import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchUpdateEmployeesSuccess,
    fetchUpdateEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/UpdateEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchUpdateEmployee(action) {
    try {
        const response = yield call(axios.post, ENDPOINTS.UPDATE_EMPLOYEE_URL, action.payload);
        yield put(fetchUpdateEmployeesSuccess(response.data));
    } catch (error) {
        yield put(fetchUpdateEmployeesFailure(error.message));
    }
}

function* updateEmployeeSaga() {
    yield takeLatest("updateEmployee/fetchUpdateEmployeesRequest", fetchUpdateEmployee);
}

export default updateEmployeeSaga;